from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:5020",
    "localhost:5020"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Item(BaseModel):
    name: str
    content: str

class JsonContent:
    def __init__(self, folder, module):
        self.folder = folder
        self.module = module

    def readJsonContent(self):
        filename = "./" + self.folder + "/configs/" + self.module
        f = open(filename, "r")
        contents = f.read()
        f.close()
        self.content = contents

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to Json Generator."}


@app.get("/jsonlist/{folder}", tags=["jsonconfigs"])
async def read_root(folder : str) -> dict:
    try:
        entries = os.listdir(folder + '/configs/')
        items  = []
        for entry in entries:
            item = JsonContent(folder, entry)
            item.readJsonContent()
            items.append(item)

        return {
            "success": "true",
            "data": items #entries
        }
    except:
        return {
            "success": "false"
        }

@app.get("/jsonlist/{folder}/{module}", tags=["jsonconfigs"])
async def read_json_file(folder : str, module : str) -> dict:
    filename = "./" + folder + "/configs/" + module
    f = open(filename, "r")
    contents = f.read()
    f.close()
    return {
        "success": "true",
        "data": contents
    }

@app.put("/jsonlist/{folder}/{module}", tags=["jsonconfigs"])
async def update_json_file(folder : str, module : str, item : Item):
    filename = "./" + folder + "/configs/" + module
    f = open(filename, "w+")
    f.write(item.content)
    f.close()
    return {
        "success": "true",
        "data": item.content
    }