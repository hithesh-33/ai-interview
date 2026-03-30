import speech_recognition as sr
from textblob import TextBlob

def analyze_confidence(text):
    # Words that typically signal low confidence
    filler_words = ['um', 'uh', 'like', 'actually', 'maybe', 'i think', 'sort of', 'kind of']
    
    text_lower = text.lower()
    words = text_lower.split()
    
    # Count filler words
    filler_count = sum(text_lower.count(filler) for filler in filler_words)
    
    # Analyze Sentiment (Polarity: -1 to 1, Subjectivity: 0 to 1)
    analysis = TextBlob(text)
    
    # Logic: High subjectivity + filler words = lower confidence
    base_score = 100
    deduction = (filler_count * 10) + (analysis.subjectivity * 20)
    final_score = max(0, min(100, base_score - deduction))
    
    return final_score, filler_count

def record_answer():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("\n--- AI Interviewer: Please answer the question now ---")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
        
    try:
        print("Analyzing...")
        answer = recognizer.recognize_google(audio)
        return answer
    except:
        return None

# --- Main Execution ---
if __name__ == "__main__":
    user_answer = record_answer()
    
    if user_answer:
        score, fillers = analyze_confidence(user_answer)
        
        print(f"\nYour Answer: \"{user_answer}\"")
        print("-" * 30)
        print(f"Confidence Score: {score}/100")
        print(f"Filler Words Detected: {fillers}")
        
        if score > 80:
            print("Status: Strong and Decisive!")
        elif score > 50:
            print("Status: Fairly confident, but watch the 'ums' and 'uhs'.")
        else:
            print("Status: Needs improvement. Try to use more definitive language.")
    else:
        print("Could not understand the audio. Please try again.")