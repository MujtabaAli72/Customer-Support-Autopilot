## Support AutoPilot – AI-Powered Customer Support Workspace

![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Python](https://img.shields.io/badge/Backend-FastAPI-green)
![AI](https://img.shields.io/badge/AI-Google%20Gemini%202.5-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

**Support AutoPilot** is a modern, full-stack customer support platform that integrates **Hybrid Artificial Intelligence** to provide instant, 24/7 assistance. Unlike standard chatbots, it combines specific business knowledge (RAG) with general AI intelligence to handle any query efficiently.

---

### 🌟 Key Features

#### Intelligent Hybrid AI Agent

* **Context-Aware:** Uses Retrieval-Augmented Generation (RAG) to answer specific business questions (e.g., "Shipping costs", "Gluten-free options") with 100% accuracy.

* **General Intelligence:** Seamlessly switches to general AI for non-business queries (e.g., "Write Python code", "General math").

* **Powered by:** Google Gemini 2.5 Flash LLM.

#### 🎙️ Voice & Interactive Chat

* **Voice Input:** Users can speak their queries using the built-in microphone (Speech-to-Text).

* **Read Aloud:** The AI can narrate its responses (Text-to-Speech).

* **Chat History:** All conversations are persisted in the database so users never lose context.



#### ⚡ Modern Workspace

* **Admin Dashboard:** Visual overview of system health and resources.

* **Team Management:** Role-Based Access Control (RBAC) to manage Admins and Agents.

* **Security:** Secure JWT Authentication and password hashing.

---

#### Technology Stack
| Component | Technology | Purpose |

| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | Lightning-fast SPA User Interface |
| **Styling** | Tailwind CSS | Modern, responsive design & Dark Mode |
| **Backend** | Python FastAPI | High-performance Asynchronous API |
| **Database** | SQLite / SQLAlchemy | Relational data storage (Users, Chats) |
| **AI Model** | Google Gemini 2.5 | Large Language Model (LLM) Inference |
| **Auth** | JWT & Bcrypt | Stateless security & Password Encryption |

---

#### Installation & Setup
Follow these steps to run the project locally.

### Prerequisites
* Node.js & npm installed
* Python 3.10+ installed
* A Google Cloud API Key (for Gemini)

2️⃣ Backend Setup
cd backend
#### Create virtual environment
python -m venv .venv

#### Activate it
#### Windows:

.venv\Scripts\activate

#### Mac/Linux:

source .venv/bin/activate

#### Install dependencies
pip install -r requirements.txt

#### Set your API Key (in main.py or export as env var)

#### GOOGLE_API_KEY = "your_key_here"

#### Run the Server
uvicorn main:app --reload
Backend runs at: http://localhost:8000

3️⃣ Frontend Setup
cd frontend-new
#### Install dependencies
npm install
#### Start the Development Server
npm run dev
Frontend runs at: http://localhost:5173

#### System Architecture
The system uses a Retrieval-Augmented Generation (RAG) workflow:
User Query: The user sends a message via the React Frontend.

Context Retrieval: The FastAPI Backend loads the specific knowledge_base.py (JSON data).
Prompt Engineering: The backend constructs a system prompt: "Use the Knowledge Base for business queries. Use General Intelligence for everything else."
Inference: The prompt is sent to Google Gemini.
Response: The AI generates a natural language answer, which is saved to the database and sent back to the user.

## 📂 Project Structure
```bash
support-autopilot/
├── backend/
│   ├── main.py            # API Entry point & AI Logic
│   ├── models.py          # Database Models (User, ChatMessage)
│   ├── knowledge_base.py  # Specific Business Data (RAG Source)
│   └── database.py        # DB Connection
├── frontend-new/
│   ├── src/
│   │   ├── pages/         # Dashboard, LiveChats, Users
│   │   ├── components/    # Sidebar, Navbar
│   │   └── contexts/      # Auth & Theme Context
```

Contributing
Contributions are welcome! Please fork the repository and create a pull request.

📄 License
This project is licensed under the MIT License.

### Developed by Mujtaba Ali : 
##### AI & Data Scientist

