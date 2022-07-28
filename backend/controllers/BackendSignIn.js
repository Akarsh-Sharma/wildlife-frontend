

export const SignIn = (req, res) => {
    const {email, password} = req.body; 
    res.send({email:email})
    // "return" prevents app from crashing by not allowing more than one res.send
    return 
};