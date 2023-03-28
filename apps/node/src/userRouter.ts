import express, { Request, Response } from "express"
import { collections } from "../../../packages/mongo/connectToMongo"
import { user, responseObject } from "../../../packages/interfaces/interfaces"
const router = express.Router()

router.get('/get-all-users', async (req: Request, res: Response) => {
    try {
        const allUsers = await collections.user.find({}).toArray()
        res.status(200).send(allUsers)
    } catch (err:any) {
        res.status(400).send(err.message)
    }
})

router.get('/get-user/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const user = await collections.user.findOne({userid: userId})
        res.status(200).send(user)
    } catch (err:any) {
        res.status(400).send(err.message)
    }
})

router.post('/post-user', async (req: Request, res: Response) => {
    try {
        const userCheck = await collections.user.find({mail: req.body.mail.toString().toLowerCase()}).toArray()
        if(userCheck.length != 0) {
            throw new Error("Mail already in use")
        }

        const userid = Math.floor(Math.random() * Date.now()).toString()
        const mail = req.body.mail.toLowerCase()
        const newUser:user = {
            userid: userid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mail: mail
        }
        await collections.user.insertOne(newUser)

        const response:responseObject = {
            code: "200",
            message: "User successfully created",
            data: newUser
        }
        res.status(200).send(response)

    } catch (err:any) {
        const response:responseObject = {
            code: "400",
            message: err.message
        }
        res.status(400).send(response)
    }
})

router.put('/put-user', async (req: Request, res: Response) => {
    try {
        const mail = req.body.mail.toLowerCase()
        const newUser:user = {
            userid: req.body.userid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mail: mail
        }

        await collections.user.findOneAndReplace(
            { userid: req.body.userid },
            newUser
        )

        const response:responseObject = {
            code: "200",
            message: "User successfully updated",
            data: newUser
        }
        res.status(200).send(response)
    } catch (err:any) {
        const response:responseObject = {
            code: "400",
            message: err.message
        }
        res.status(400).send(response)
    }
}) 

router.delete('/delete-user', async (req: Request, res: Response) => {
    try {
        const deletedUser = await collections.user.deleteOne({userid: req.body.userid})

        res.status(200).send(deletedUser)
    } catch(err:any) {
        const response:responseObject = {
            code: "400",
            message: err.message
        }
        res.status(400).send(response)
    }
    
})

module.exports = router