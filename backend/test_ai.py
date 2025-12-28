# ==========================================
#  AI CONFIGURATION
# ==========================================
import google.generativeai as genai

# YOUR REAL KEY IS HERE
GOOGLE_API_KEY = "AIzaSyDa5udV9RD7GPCsYlYzu684lPzGvhdnbPU"

model = None

try:
    print(f"[*] Attempting to connect with Key: {GOOGLE_API_KEY[:10]}...")
    
    # Configure directly (No 'if' statement checking for placeholders)
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
    
    print("[+] AI Model initialized successfully!")
except Exception as e:
    print(f"[-] AI Connection Failed: {e}")
    model = None