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
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

const RecruiterAI = ({ projectsData }) => {
  const [open, setOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);

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
          <TextField
            label="Job Description"
            multiline
            rows={4}
            fullWidth
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste your job description here to see why i am best fit for the role"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleAnalyze} color="primary" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </DialogActions>

        {analysisResult && (
          <Card style={{ margin: 16, backgroundColor: '#f5f5f5', maxHeight: '200px', overflowY: 'auto' }}>
            <CardContent>
              <ReactMarkdown>{analysisResult}</ReactMarkdown>
            </CardContent>
          </Card>
        )}
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