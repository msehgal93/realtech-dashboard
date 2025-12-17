# RealTech AI Microservice

This is a FastAPI microservice for the RealTech CRM platform. It handles AI-powered script generation.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

## Endpoints

### POST /generate-script

Generates a sales script based on input parameters.

**Request Body:**
```json
{
  "product_name": "RealTech CRM",
  "target_customer": "Real Estate Agencies",
  "tone": "friendly",
  "tenantId": "tenant-123"
}
```

**Response:**
```json
{
  "script": "Hey there! I understand you're looking for a solution for Real Estate Agencies..."
}
```
