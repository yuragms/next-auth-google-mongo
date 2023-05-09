import { hash } from 'bcryptjs';
// import connectMongo from '../../../database/conn';
import clientPromise from '../../../database/conn';
import Users from '../../../model/Schema';

export default async function handler(req, res) {
  clientPromise().catch((error) =>
    res.json({ error: 'Connection Failed...!' })
  );
  //only post mathod is accepted
  if (req.method === 'POST') {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data...!" });
    const { username, email, password } = req.body;
    console.log(username);

    //check duplicate userSelect
    const checkexisting = await Users.findOne({ email });
    if (checkexisting)
      return res.status(422).json({ message: 'User Already Exist...!' });

    //hash password
    // Users.create(
    //   { username, email, password: await hash(password, 12) },
    //   function (err, data) {
    //     if (err) return res.status(404).json({ err });
    //     res.status(201).json({ status: true, user: data });
    //   }
    // );
    Users.create({
      username,
      email,
      password: await hash(password, 12),
    })
      .then((data) => {
        res.status(201).json({ status: true, user: data });
      })
      .catch((err) => {
        return res.status(404).json({ err });
      });
  } else {
    res
      .status(500)
      .json({ message: 'HTTP method not valid only POST Accepted' });
  }
}
