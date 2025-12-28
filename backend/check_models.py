import google.generativeai as genai

# Your Key
GOOGLE_API_KEY = "AIzaSyDa5udV9RD7GPCsYlYzu684lPzGvhdnbPU"

try:
    genai.configure(api_key=GOOGLE_API_KEY)
    
    print("--- 🔍 CHECKING AVAILABLE MODELS ---")
    print(f"Key used: {GOOGLE_API_KEY[:10]}...")
    
    available_models = []
    for m in genai.list_models():
        # We only want models that support 'generateContent' (Chatbots)
        if 'generateContent' in m.supported_generation_methods:
            print(f"✅ FOUND: {m.name}")
            available_models.append(m.name)

    if not available_models:
        print("❌ No chat models found. Your API key might be restricted or the library is too old.")
    else:
        print(f"\nRecommended: Use '{available_models[0].replace('models/', '')}' in your main.py")

except Exception as e:
    print(f"\n❌ CRITICAL ERROR: {e}")