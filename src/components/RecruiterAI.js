import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import { AiOutlineRobot } from "react-icons/ai";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from "framer-motion";

const RecruiterAI = ({ projectsData }) => {
  const [open, setOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAnalyze = async () => {
    if (!jobDescription) return;
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing. Check your .env file.");
      }
      console.log("Using API Key:", apiKey.substring(0, 5) + "...");
      
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `Analyze the following job description and explain why my projects are a good fit to the recruiter or potential employer:\n\nJob Description:\n${jobDescription}\n\nProjects:\n${JSON.stringify(projectsData)}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setAnalysisResult(text);
    } catch (error) {
      console.error('Error analyzing job description:', error);
      setAnalysisResult(`Error: ${error.message || error.toString()}. Please check your API key and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    setPdfLoading(true);
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing");

      const genAI = new GoogleGenerativeAI(apiKey);
      // Using the model requested for the feature
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `Write a professional, enthusiastic cover letter based on the following job description and my projects.
      
      Job Description:
      ${jobDescription}
      
      Projects:
      ${JSON.stringify(projectsData)}
      
      CONSTRAINT: Output ONLY the raw body text of the letter. Do not use Markdown. Do not use placeholders.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const doc = new jsPDF();
      doc.setFontSize(12);
      // Wrap text to fit within PDF page width (A4 is approx 210mm wide, leaving margins)
      const splitText = doc.splitTextToSize(text, 170);
      doc.text(splitText, 15, 20);
      doc.save("Gemini_Cover_Letter.pdf");

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <>
      <Fab
        variant="extended"
        color="primary"
        aria-label="Recruiter Mode"
        onClick={handleOpen}
        style={{ position: 'fixed', bottom: 30, left: 30, zIndex: 1000, fontWeight: 'bold' }}
      >
        <AiOutlineRobot style={{ fontSize: '1.5rem', marginRight: '8px' }} />
        Recruiter Mode
      </Fab>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Recruiter Match</DialogTitle>
        <DialogContent>
          <AnimatePresence mode="wait">
            {!analysisResult ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <TextField
                  label="Job Description"
                  multiline
                  rows={4}
                  fullWidth
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste your job description here to see why i am best fit for the role"
                  sx={{ mt: 1 }}
                />
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">Cancel</Button>
                  <Button onClick={handleAnalyze} color="primary" disabled={loading}>
                    {loading ? 'Analyzing...' : 'Analyze'}
                  </Button>
                </DialogActions>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Card style={{ margin: '16px 0', backgroundColor: '#f5f5f5', maxHeight: '400px', overflowY: 'auto' }}>
                  <CardContent>
                    <ReactMarkdown>{analysisResult}</ReactMarkdown>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Button onClick={() => setAnalysisResult('')} color="secondary">
                        Analyze Another
                      </Button>
                      <Button 
                        onClick={handleGeneratePDF} 
                        color="success" 
                        variant="contained" 
                        disabled={pdfLoading}
                        startIcon={<PictureAsPdfIcon />}
                      >
                        {pdfLoading ? 'Writing...' : 'Download Cover Letter'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}; 

export default RecruiterAI;




/*A Junior Backend Developer is responsible for developing, maintaining, and optimizing server-side logic, databases, and APIs that support web and mobile applications. Key responsibilities include:
Writing and maintaining server-side code and APIs to ensure applications function smoothly and efficiently. 
2
Collaborating with front-end developers to ensure seamless integration and reliable backend systems. 
2
Implementing performance optimization techniques and security measures to safeguard applications. 
2
Participating in code reviews and contributing to team knowledge-sharing initiatives. 
2
Gaining hands-on experience in backend development while working in a collaborative team environment. 
2

This role typically requires a bachelor's degree in Computer Science or a related field, with 1-2 years of experience in backend development.*/


