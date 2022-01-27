import Room from '../models/room'
import ErrorHandler from '../utils/ErrorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';


const allRooms=catchAsyncErrors(async(req,res)=>{
    
    const resPerPage=4;
    const roomsCount=await Room.countDocuments()

    const apiFeatures=new APIFeatures(Room.find(), req.query)
    .search()
    .filter()

   
    let rooms=await apiFeatures.query;
    let filteredRoomsCount=rooms.length

    apiFeatures.pagination(resPerPage);
    rooms=await apiFeatures.query;    

    res.status(200).json({
        success:true,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
    })
    // } catch (error) {
    //     res.status(400).json({
    //         success:false,
    //         error:error.message
    //     })
    // }
    
    
})


//create new room -/api/rooms

const newRoom=catchAsyncErrors(async(req,res)=>{

    // try {
        
        const room= await Room.create(req.body)
        res.status(200).json({
        success:true,
        room
    })

    // } catch (error) {
    //     res.status(400).json({
    //         success:false,
    //         error:error.message
    //     })
    // }

    
    
}
)

//get room detail
const getSingleRoom=catchAsyncErrors(async(req,res)=>{

    // try {
        
        const room= await Room.findById(req.query.id)

        if(!room){
            // res.status(400).json({
            //     success:false,
            //     error:'room not found with this id'
            // })
            return next(new ErrorHandler('room not found with this id',404))
        }

        res.status(200).json({
        success:true,
        room
    })

    // } catch (error) {
    //     res.status(400).json({
    //         success:false,
    //         error:error.message
    //     })
    // }

    
    
})


//updateRoom room detail
const updateRoom=catchAsyncErrors(async(req,res)=>{

    // try {
        
        let room= await Room.findById(req.query.id)

        if(!room){
            // res.status(404).json({
            //     success:false,
            //     error:'room not found with this id'
            // })
            return next(new ErrorHandler('room not found with this id',404))
        }
        room=await Room.findByIdAndUpdate(req.query.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })
        res.status(200).json({
        success:true,
        room
    })

    // } catch (error) {
    //     res.status(404).json({
    //         success:false,
    //         error:error.message
    //     })
    // }

    
    
})



//deleteRoom room detail
const deleteRoom=catchAsyncErrors(async(req,res)=>{

    // try {
        
        const room= await Room.findById(req.query.id)

        if(!room){
            // res.status(404).json({
            //     success:false,
            //     error:'room not found with this id'
            // })
            return next(new ErrorHandler('room not found with this id',404))
        }
        await room.remove()

        res.status(200).json({
            success:true,
            message:'room is deleted. '
        })

    // } catch (error) {
    //     res.status(404).json({
    //         success:false,
    //         error:error.message
    //     })
    // }

    
    
})

export {allRooms, newRoom, getSingleRoom,updateRoom,deleteRoom}