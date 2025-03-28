import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function ClauseCheckApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [documents, setDocuments] = useState([
    {
      title: "Employment Agreement",
      text: "This Employment Agreement is made effective as of ...",
      risks: ["Termination Clause Detected", "Non-Compete Agreement Found"],
      compliance: ["GDPR Compliance Mentioned"],
      obligations: ["Employer must provide 30 days' notice before termination."],
      suggestions: ["Clarify non-compete duration", "Specify severance package"]
    },
    {
      title: "Vendor Contract",
      text: "This Vendor Contract is entered into between ...",
      risks: ["Indemnification Clause Identified"],
      compliance: ["Data Protection Addendum Missing"],
      obligations: ["Vendor must deliver goods within 15 days"],
      suggestions: ["Ensure data protection addendum is included", "Define late delivery penalties"]
    }
  ]);
  const [newDoc, setNewDoc] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [uploadMode, setUploadMode] = useState("text");

  const handleLogin = () => {
    if (username === "admin" && password === "password123") {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const analyzeDocument = () => {
    if (newDoc.trim() !== "") {
      const analysis = {
        title: "New Document",
        text: newDoc,
        risks: ["Indemnification Clause Found"],
        compliance: ["Confidentiality Clause Present"],
        obligations: ["Party A shall provide payment within 30 days"],
        suggestions: ["Ensure indemnification scope is well-defined", "Clarify payment terms"]
      };
      setDocuments([...documents, analysis]);
      setNewDoc("");
    }
  };

  return (
    <Router>
      <div className="p-6 max-w-4xl mx-auto">
        {!loggedIn ? (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Sign In</h2>
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" />
            <Button className="mt-4 w-full" onClick={handleLogin}>Login</Button>
          </Card>
        ) : (
          <div>
            <header className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold">ClauseCheck AI</h2>
              <Button onClick={handleLogout}>Sign Out</Button>
            </header>
            <nav className="mb-4 flex space-x-4">
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/new-analysis">New Analysis</Link>
            </nav>
            <Routes>
              <Route path="/" element={<h3 className="text-lg font-semibold">Welcome to ClauseCheck AI - Your Contract Analysis Assistant</h3>} />
              <Route path="/dashboard" element={
                <div>
                  <h3 className="text-lg font-semibold">Past Scanned Documents</h3>
                  {documents.map((doc, index) => (
                    <Card key={index} className="p-4 mb-2 cursor-pointer" onClick={() => setSelectedDoc(doc)}>
                      <h4 className="font-semibold">{doc.title}</h4>
                    </Card>
                  ))}
                  {selectedDoc && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 border rounded grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-bold mb-2">Original Document</h3>
                        <p className="text-gray-600">{selectedDoc.text}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">Analysis</h3>
                        <p><strong>Risks:</strong> {selectedDoc.risks.join(", ")}</p>
                        <p><strong>Compliance Issues:</strong> {selectedDoc.compliance.join(", ")}</p>
                        <p><strong>Obligations:</strong> {selectedDoc.obligations.join(", ")}</p>
                        <h4 className="mt-2 font-semibold">Suggestions:</h4>
                        <ul className="list-disc pl-5">
                          {selectedDoc.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                      <Button className="mt-4" onClick={() => setSelectedDoc(null)}>Close</Button>
                    </motion.div>
                  )}
                </div>
              } />
              <Route path="/new-analysis" element={
                <div>
                  <h3 className="text-lg font-semibold">Analyze a New Document</h3>
                  <div className="mb-4">
                    <Button onClick={() => setUploadMode("text")} className="mr-2">Paste Text</Button>
                    <Button onClick={() => setUploadMode("upload")}>Upload File</Button>
                  </div>
                  {uploadMode === "text" ? (
                    <Textarea placeholder="Paste contract text here..." value={newDoc} onChange={(e) => setNewDoc(e.target.value)} />
                  ) : (
                    <Input type="file" className="mt-2" />
                  )}
                  <Button className="mt-2 w-full" onClick={analyzeDocument}>Analyze</Button>
                </div>
              } />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}
