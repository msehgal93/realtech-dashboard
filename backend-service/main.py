from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import time

app = FastAPI(title="RealTech AI Microservice")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScriptRequest(BaseModel):
    product_name: str
    target_customer: str
    tone: str
    tenantId: str

class ScriptResponse(BaseModel):
    script: str

@app.get("/")
def health_check():
    return {"status": "ok", "service": "RealTech AI"}

@app.post("/generate-script", response_model=ScriptResponse)
async def generate_script(request: ScriptRequest):
    # Simulate processing delay
    time.sleep(1.5)
    
    # Placeholder LLM logic
    # In a real app, this would call OpenAI or another LLM provider
    
    tone_modifier = ""
    if request.tone.lower() == "friendly":
        tone_modifier = "Hey there! "
    elif request.tone.lower() == "formal":
        tone_modifier = "Good day. "
    else:
        tone_modifier = "Hi. "

    generated_text = (
        f"{tone_modifier}I understand you're looking for a solution for {request.target_customer}. "
        f"Our product, {request.product_name}, is designed specifically to help with that. "
        "Would you be open to a brief 10-minute demo to see how it works?"
    )
    
    return ScriptResponse(script=generated_text)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
