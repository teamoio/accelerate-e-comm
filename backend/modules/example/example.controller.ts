import { AppDataSource } from "../../database/dbConnect";
import { Example } from "./example.entity";

const exampleRepo = AppDataSource.getRepository(Example);

export const getExamples = async (req: any, res: any) => {
  //find all records
  const allRecords = await exampleRepo.find();
  res.status(200).json({ success: true, data: allRecords });
};

export const getExample = async (req: any, res: any) => {
  //find one records
  const record = await exampleRepo.find({
    where: {
      id: 1,
    },
  });
  res.status(200).json({ success: true, data: record });
};

export const createExample = async (req: any, res: any) => {
  const example: Example = new Example();
  example.firstname = "Kamran";
  example.lastname = "Shahid";
  example.email = "kamran.shahid@gmail.com";
  await exampleRepo.save(example);
  res.status(200).send("Example added successfully");
};

export const updateExample = async (req: any, res: any) => {
  await exampleRepo.update(1, {
    firstname: "Kamran Updated",
    lastname: "Shahid Updated",
  });
  res.status(200).send("Example Updated successfully");
};

export const deleteExample = async (req: any, res: any) => {
  const example: Example = new Example();
  await exampleRepo.delete(2);
  res.status(200).send("Example deleted successfully");
};

export const getExamplePostman = (req: any, res: any) => {
  res.status(200).send("Get ExamplePostman requested");
};
