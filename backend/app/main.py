from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import get_db, engine, Base

app = FastAPI(title="Hello World API", version="0.1.0")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"message": "Hello World from FastAPI with PostgreSQL!"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/hello")
def hello():
    return {"message": "Hello from API!"}

@app.get("/api/db-test")
def test_database(db: Session = Depends(get_db)):
    try:
        result = db.execute("SELECT 1 AS test").scalar_one()
        return {"message": "Database connection OK", "test_result": result}
    except Exception as e:
        return {"message": "Database connection failed", "error": str(e)}
