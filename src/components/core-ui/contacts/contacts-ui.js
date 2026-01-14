import { IconButton, Snackbar, SnackbarContent } from '@mui/material';
import React, { useContext } from 'react';
import { AiOutlineCheckCircle, AiOutlineSend } from 'react-icons/ai';
import { FaFacebook, FaGithub, FaLinkedinIn, FaMediumM, FaStackOverflow, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiAtSign, FiPhone } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from '../../../contexts/theme-context';
import { contactsData } from '../../../data/contactsData';
import './contacts.css';

const ContactUI = ({ open, success, errMsg, handleClose, classes, handleContactForm, name, setName, form, email, setEmail, message, setMessage }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className='contacts'
      id='contacts'
      style={{ backgroundColor: theme.secondary }}
    >
      <div className='contacts--container'>
        <h1 style={{ color: theme.primary }}>Contacts</h1>
        <div className='contacts-body'>
          <div className='contacts-form'>
            <form ref={form} onSubmit={handleContactForm}>
              <div className='input-container'>
                <label htmlFor='Name' className={classes.label}>
                  Name
                </label>
                <input
                  placeholder='John Doe'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type='text'
                  name='user_name'
                  className={`form-input ${classes.input}`}
                />
              </div>
              <div className='input-container'>
                <label
                  htmlFor='Email'
                  className={classes.label}
                >
                  Email
                </label>
                <input
                  placeholder='John@doe.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  name='user_email'
                  className={`form-input ${classes.input}`}
                />
              </div>
              <div className='input-container'>
                <label
                  htmlFor='Message'
                  className={classes.label}
                >
                  Message
                </label>
                <textarea
                  placeholder='Type your message....'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type='text'
                  name='message'
                  className={`form-message ${classes.message}`}
                />
              </div>

              <div className='submit-btn'>
                <button
                  type='submit'
                  className={classes.submitBtn}
                >
                  <p>{!success ? 'Send' : 'Sent'}</p>
                  <div className='submit-icon'>
                    <AiOutlineSend
                      className='send-icon'
                      style={{
                        animation: !success
                          ? 'initial'
                          : 'fly 0.8s linear both',
                        position: success
                          ? 'absolute'
                          : 'initial',
                      }}
                    />
                    <AiOutlineCheckCircle
                      className='success-icon'
                      style={{
                        display: !success
                          ? 'none'
                          : 'inline-flex',
                        opacity: !success ? '0' : '1',
                      }}
                    />
                  </div>
                </button>
              </div>
            </form>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <SnackbarContent
                action={
                  <React.Fragment>
                    <IconButton
                      size='small'
                      aria-label='close'
                      color='inherit'
                      onClick={handleClose}
                    >
                      <IoClose fontSize='small' />
                    </IconButton>
                  </React.Fragment>
                }
                style={{
                  backgroundColor: theme.primary,
                  color: theme.secondary,
                  fontFamily: 'var(--primaryFont)',
                }}
                message={errMsg}
              />
            </Snackbar>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleClose}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10000,
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    style={{
                      background: theme.secondary,
                      padding: '3rem',
                      borderRadius: '20px',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                      textAlign: 'center',
                      maxWidth: '400px',
                      border: `2px solid ${theme.primary}`,
                      position: 'relative'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AiOutlineCheckCircle style={{ fontSize: '5rem', color: theme.primary, marginBottom: '1rem' }} />
                    <h2 style={{ color: theme.tertiary, marginBottom: '0.5rem', fontFamily: 'var(--primaryFont)' }}>Thank You!</h2>
                    <p style={{ color: theme.tertiary, fontFamily: 'var(--primaryFont)' }}>
                      Thanks for your message, I will get back to you soon.
                    </p>
                    <button 
                      onClick={handleClose}
                      style={{
                        marginTop: '1.5rem',
                        padding: '10px 30px',
                        background: theme.primary,
                        color: theme.secondary,
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontFamily: 'var(--primaryFont)',
                        fontWeight: 'bold'
                      }}
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className='contacts-details'>
            <a
              href={`mailto:${contactsData.email}`}
              className='personal-details'
            >
              <div className={classes.detailsIcon}>
                <FiAtSign />
              </div>
              <p style={{ color: theme.tertiary }}>
                {contactsData.email}
              </p>
            </a>
            <a
              href={`tel:${contactsData.phone}`}
              className='personal-details'
            >
              <div className={classes.detailsIcon}>
                <FiPhone />
              </div>
              <p style={{ color: theme.tertiary }}>
                {contactsData.phone}
              </p>
            </a>
            <div className='personal-details'>
              <div className={classes.detailsIcon}>
                <HiOutlineLocationMarker />
              </div>
              <p style={{ color: theme.tertiary }}>
                {contactsData.address}
              </p>
            </div>

            <div className='socialmedia-icons'>
              {contactsData.twitter && (
                <a
                  href={contactsData.twitter}
                  target='_blank'
                  rel='noreferrer'
                  className={classes.socialIcon}
                >
                  <FaTwitter aria-label='Twitter' />
                </a>
              )}
              {contactsData.github && (
                <a
                  href={contactsData.github}
                  target='_blank'
                  rel='noreferrer'
                  className={classes.socialIcon}
                >
                  <FaGithub aria-label='GitHub' />
                </a>
              )}
              {contactsData.linkedIn && (
                <a
                  href={contactsData.linkedIn}
                  target='_blank'
                  rel='noreferrer'
                  className={classes.socialIcon}
                >
                  <FaLinkedinIn aria-label='LinkedIn' />
                </a>
              )}

              {contactsData.medium && (
                <a
                  href={contactsData.medium}
                  target='_blank'
                  rel='noreferrer'
                  className={classes.socialIcon}
                >
                  <FaMediumM aria-label='Medium' />
                </a>
              )}

              {contactsData.youtube && (
                <a
                  href={contactsData.youtube}
                  target='_blank'
                  rel='noreferrer'
                  className={classes.socialIcon}
                >
                  <FaYoutube aria-label='YouTube' />
                </a>
              )}

              {contactsData.stackOverflow && (
                <a
                  href={contactsData.stackOverflow}
                  target='_blank'
                  rel='noreferrer'
                  className={classes.socialIcon}
                >
                  <FaStackOverflow aria-label='Stack Overflow' />
                </a>
              )}
              {contactsData.facebook && (
                <a
                  href={contactsData.facebook}
                  target='_blank'
                  rel='noreferrer'
                  className={classes.socialIcon}
                >
                  <FaFacebook aria-label='facebook' />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <img
        src={theme.contactsimg}
        alt='contacts'
        className='contacts--img'
      />
    </div>
  );
};

export default ContactUI;