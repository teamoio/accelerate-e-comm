// import { AppDataSource } from "../../database/dbConnect";
// import { Example } from "../../entities/example";
// import CustomHttpError from "../../utils/CustomError";
// import { error, success } from "../../utils/response";

// const exampleRepo = AppDataSource.getRepository(Example);

// export const getExamples = async (req: any, res: any, next: any) => {
//   try {
//     // read the "name" query parameter
//     let name = req.query.name;

//     if (name) {
//       res
//         .status(200)
//         .json(success(res.statusCode, `Hello, ${name}!`, [{ name: "karman" }]));
//     } else {
//       // initialize a 400 error to send to the
//       // error handling layer
//       res
//         .status(400)
//         .json(error(400, `Required query parameter "name" is missing!`));
//     }
//   } catch (err) {
//     // catch any error and send it
//     // to the error handling middleware
//     res
//       .status(400)
//       .json(error(400, `Required query parameter "name" is missing!`));
//   }

//   // try {
//   //   // read the "name" query parameter
//   //   let name = req.query.name;

//   //   if (name) {
//   //     res.status(200).json(success(res.statusCode, `Hello, ${name}!`, []));
//   //   } else {
//   //     // initialize a 400 error to send to the
//   //     // error handling layer
//   // throw new CustomHttpError(
//   //   400,
//   //   `Required query parameter "name" is missing!`
//   // );
//   //     // res
//   //     //   .status(400)
//   //     //   .json(error(400, `Required query parameter "name" is missing!`));
//   //   }
//   // } catch (e) {
//   //   // catch any error and send it
//   //   // to the error handling middleware
//   //   return next(e);
//   // }
// };

// export const getExample = async (req: any, res: any) => {
//   //find one records
//   const record = await exampleRepo.find({
//     where: {
//       id: 1,
//     },
//   });
//   res.status(200).json({ success: true, data: record });
// };

// export const createExample = async (req: any, res: any) => {
//   const example: Example = new Example();
//   example.firstname = "Kamran";
//   example.lastname = "Shahid";
//   example.email = "kamran.shahid@gmail.com";
//   await exampleRepo.save(example);
//   res.status(200).send("Example added successfully");
// };

// export const updateExample = async (req: any, res: any) => {
//   await exampleRepo.update(1, {
//     firstname: "Kamran Updated",
//     lastname: "Shahid Updated",
//   });
//   res.status(200).send("Example Updated successfully");
// };

// export const deleteExample = async (req: any, res: any) => {
//   const example: Example = new Example();
//   await exampleRepo.delete(2);
//   res.status(200).send("Example deleted successfully");
// };

// export const getExamplePostman = (req: any, res: any) => {
//   res.status(200).send("Get ExamplePostman requested");
// };
