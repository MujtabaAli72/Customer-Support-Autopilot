import json
import numpy as np
from typing import List, Dict, Tuple
from sentence_transformers import SentenceTransformer
import faiss
import os

class RAGEngine:
    def __init__(self, faq_path: str = "data/faqs.json", model_name: str = 'all-MiniLM-L6-v2'):
        """
        Initialize the RAG Engine with FAQ data and embedding model.
        
        Args:
            faq_path: Path to the JSON file containing FAQs
            model_name: Name of the sentence transformer model to use
        """
        self.model = SentenceTransformer(model_name)
        self.faqs = self._load_faqs(faq_path)
        self.index = self._build_faiss_index()
        
    def _load_faqs(self, faq_path: str) -> List[Dict]:
        """Load FAQs from a JSON file."""
        try:
            with open(faq_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            # Return some sample FAQs if the file doesn't exist
            return [
                {"id": "faq_1", "question": "How do I reset my password?", "answer": "You can reset your password by clicking on 'Forgot Password' on the login page."},
                {"id": "faq_2", "question": "What are your business hours?", "answer": "Our support team is available 24/7 to assist you."},
                {"id": "faq_3", "question": "How can I track my order?", "answer": "You can track your order by logging into your account and visiting the 'My Orders' section."}
            ]
    
    def _build_faiss_index(self) -> faiss.IndexFlatL2:
        """Build a FAISS index from the FAQ embeddings."""
        # Generate embeddings for all FAQ questions
        questions = [faq["question"] for faq in self.faqs]
        question_embeddings = self.model.encode(questions, convert_to_tensor=False)
        
        # Create and train the FAISS index
        dimension = question_embeddings.shape[1]
        index = faiss.IndexFlatL2(dimension)
        index.add(question_embeddings.astype('float32'))
        
        return index
    
    def retrieve_relevant_faqs(self, query: str, k: int = 3, threshold: float = 0.7) -> List[Dict]:
        """
        Retrieve the most relevant FAQs for a given query.
        
        Args:
            query: The user's query
            k: Number of results to return
            threshold: Minimum similarity score threshold
            
        Returns:
            List of relevant FAQs with their similarity scores
        """
        # Encode the query
        query_embedding = self.model.encode([query], convert_to_tensor=False).astype('float32')
        
        # Search the FAISS index
        distances, indices = self.index.search(query_embedding, k)
        
        # Convert distances to similarity scores (1 / (1 + distance))
        similarities = 1 / (1 + distances[0])
        
        # Get the relevant FAQs
        results = []
        for i, idx in enumerate(indices[0]):
            if similarities[i] >= threshold:
                faq = self.faqs[idx].copy()
                faq["similarity"] = float(similarities[i])
                results.append(faq)
        
        # Sort by similarity score (descending)
        results.sort(key=lambda x: x["similarity"], reverse=True)
        
        return results
    
    def generate_answer(self, query: str, context: List[Dict]) -> Tuple[str, List[Dict]]:
        """
        Generate an answer using the retrieved FAQ context.
        
        Args:
            query: The user's query
            context: List of relevant FAQs with similarity scores
            
        Returns:
            Tuple of (answer, sources)
        """
        if not context:
            return "I'm sorry, I couldn't find a relevant answer to your question. Could you please provide more details?", []
        
        # For now, return the top FAQ answer
        # In a real implementation, you might want to use an LLM to generate a more natural response
        top_faq = context[0]
        answer = top_faq["answer"]
        sources = [{"id": top_faq["id"], "question": top_faq["question"]}]
        
        return answer, sources
