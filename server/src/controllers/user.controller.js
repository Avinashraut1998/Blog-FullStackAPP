import { User } from "../models/user.model.js";

const createUser = async (req, res) => {

    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        };

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        };

        const user  = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        user.password = '';

        res.status(201).json({ user, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const loginUser = async(req,res)=>{
    const { email, password } = req.body;
   
    try {
          
    if(!email || !password){
        return res.status(400).json({ error: "All fields are required" });
    };

    const user = await User.findOne({email});
    user.password = '';

    if(!user) res.status(404).json({error: "User in not registered"})

    const isPasswordCorrect = await user.checkPassword(password);

    if(!isPasswordCorrect) res.status(401).json({error: "Invalid credentials"});
   
    res.status(200).json({ 
        body: { user },
        message: "User logged in successfully"
    })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { createUser , loginUser};