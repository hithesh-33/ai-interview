from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # This allows your frontend to connect to this backend
# Configure your Gemini API Key
genai.configure(api_key="YOUR_GEMINI_API_KEY")
model = genai.GenerativeModel('gemini-pro')

def calculate_confidence(text):
    fillers = ['um', 'uh', 'like', 'maybe', 'i think', 'actually']
    text_lower = text.lower()
    filler_count = sum(text_lower.count(f) for f in fillers)
    
    # TextBlob for subjectivity (0.0 is objective/confident, 1.0 is subjective/hesitant)
    analysis = TextBlob(text)
    
    score = 100 - (filler_count * 10) - (analysis.subjectivity * 20)
    return max(0, min(100, score))

@app.route('/analyze', methods=['POST'])
def analyze_interview():
    data = request.json
    user_answer = data.get("answer")
    question = data.get("question")

    # 1. Check Confidence
    confidence_score = calculate_confidence(user_answer)

    # 2. Check Technical Accuracy using Gemini
    prompt = f"""
    Question: {question}
    Candidate Answer: {user_answer}
    Rate the technical accuracy from 0 to 100 and give a 1-sentence feedback.
    Return format: Score | Feedback
    """
    response = model.generate_content(prompt)
    
    return jsonify({
        "confidence": confidence_score,
        "ai_analysis": response.text
    })

if __name__ == "__main__":
    app.run(debug=True)