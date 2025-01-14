from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import os
from fastapi.middleware.cors import CORSMiddleware

# run using command: python3 uvicorn main:app --reload
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to save uploaded images
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded file
        file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())

        return {"message": "Image uploaded successfully!", "file_path": file_path}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
