from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to Json Generator."}


@app.get("/jsonlist/{folder}", tags=["root"])
async def read_root(folder : str) -> dict:
    arr = os.listdir("./" + folder + "/configs")
    return {"data": arr}

@app.get("/jsonlist/{folder}/{module}", tags=["root"])
async def read_root(folder : str, module : str) -> dict:
    filename = "./" + folder + "/configs/" + module
    with open(filename) as f:
        return {"data": f.read()}
