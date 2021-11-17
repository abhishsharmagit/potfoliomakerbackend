import { appendFile } from "fs";
import { CreateFileDTO } from "src/dto/createFileDTO";
export const filePayload: CreateFileDTO[] = [
  {
    path: "bundle.js",
    message: "conatct file created",
    fileName: "bundle.js",
  },
  {
    path: "js/credentials.json",
    message: "conatct file created",
    fileName: "credentials.json",
  },
  {
    path: "index.html",
    message: "conatct file created",
    fileName: "index.html",
  },
];
