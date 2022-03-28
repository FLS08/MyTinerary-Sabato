const Itineraries = require('../models/itineraries')

const commentsControllers = {

    addComment: async (req, res) => {

        const comment = req.body.comment.comment
        const itinerary = req.body.comment.itineraryId
        
        const user = req.user.id

        console.log(user)
        try {
            const nuevoComment = await Itineraries.findOneAndUpdate({_id:itinerary}, {$push: {coments: {coment: comment, userId: user}}}, {new: true}).populate("coments.userId", {name:1 ,lastName:1,urlImage:1})
            res.json({ success: true, response:{nuevoComment}, message:"Thanks for give us your comment!" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something were wrong, please try again." })
        }

    },
    modifiComment: async (req, res) => {
        const {commentID,comment} = req.body.comment
        const user = req.user._id
        try {
            const newComment = await Itineraries.findOneAndUpdate({"coments._id":commentID}, {$set: {"coments.$.coment": comment,"coments.$.date": Date.now() }}, {new: true})
            res.json({ success: true, response:{newComment}, message:"Your comment has been modified." })

        }
        catch (error) {
            console.log(error)
            res.json({ success: true, message: "Something were wrong, please try again." })
        }

    },
    deleteComment: async (req, res) => {
        const id = req.params.id
        const user = req.user._id
        try {
            const deleteComment = await Itineraries.findOneAndUpdate({"coments._id":id}, {$pull: {coments: {_id: id}}}, {new: true})
          
            res.json({ success: true, response:{deleteComment}, message: "Your comment was deleted." })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something were wrong, please try again." })
        }

    },
    
}
module.exports = commentsControllers