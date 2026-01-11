# CardioPredict

## Prerequisites
- Python 3.8+
- Node.js & npm

## 1. Backend (Model API)
Navigate to the `model` folders:
```powershell
cd "e:/6th sem/ML/project Ready/model"
```

Run the FastAPI server:
```powershell
uvicorn main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

## 2. Frontend (React UI)
Open a new terminal and navigate to the `UI` folder:
```powershell
cd "e:/6th sem/ML/project Ready/UI"
```

Install dependencies (first time only):
```powershell
npm install
```

Run the development server:
```powershell
npm run dev
```
The UI will be available at `http://localhost:5173` (or the port shown in the terminal).
