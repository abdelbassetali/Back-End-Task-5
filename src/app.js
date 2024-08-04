const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbname = "Task"

mongoClient.connect(connectionUrl, (error, task) => {
    if (error) {
        console.log("error has occured")
    }
    console.log('connection is complete')
    const db = task.db('Task')

    //1-insertOne

        db.collection('user').insertOne(
            {
                name: 'alaa',
                age: 22
            },
            (error, data) => {
                if (error) {
                    console.log('Error has occured')
                }
                console.log(data.insertedId)
            }
        )

        db.collection('user').insertOne(
            {
                name: 'eslam',
                age: 19
            },
            (error, data) => {
                if (error) {
                    console.log('Error has occured')
                }
                console.log(data.insertedId)
            }
        )


    //2-insertMany
        db.collection('user').insertMany([
            {
                name: 'alaa',
                age: 27
            },
            {
                name: 'eslam',
                age: 27
            }, {
                name: 'aly',
                age: 27
            }, {
                name: 'ahmed',
                age: 27
            }, {
                name: 'mohamed',
                age: 27
            },
            {
                name: 'nor',
                age: 25
            },
            {
                name: 'aya',
                age: 28
            }, {
                name: 'arwa',
                age: 23
            }, {
                name: 'alyaa',
                age: 24
            }, {
                name: 'fadwa',
                age: 29
            }
    ],
            (error, data) => {
                if (error) {
                    console.log('Error insertMany')
                }
                console.log(data.insertedCount)
            }
        )

    //3-find
    db.collection('user').find({age:27}).toArray((error,data)=>{
        if(error){
            console.log('Error find')
        }
        console.log(data)
    })

    //4-limit
    db.collection('user').find({age:27}).limit(3).toArray((error,data)=>{
        if(error){
            console.log('Error limit ')
        }
        console.log(data)
    })

    //5-set name for first 4 docs
    db.collection("user").find().limit(4).toArray()
        .then((docs) => {
            const Setdoc = docs.map((doc, index) => {
                const names = ["salam", "salwa", "ahmed", "Mustafa"];
                return {
                    updateOne: {
                        filter: { _id: doc._id },
                        update: { $set: { name: names[index] } }
                    },
                };
            });
            return db.collection("user").bulkWrite(Setdoc);
        })
        .then((result) => console.log(result.modifiedCount))
        .catch((error) => console.log(error));


    //6-inc age for first age  +4
    db.collection('user').find().limit(4).toArray()
        .then((updateAge) => {
            const incAge = updateAge.map((age, index) => {
                const ages = [4,4,4,4];
                return{
                    updateOne:{
                        filter:{_id:age._id},
                        update:{$inc:{age:ages[index]}}
                    }
                }
            });
            return db.collection('user').bulkWrite(incAge)
        })
        .then((result) => console.log(result.modifiedCount))
        .catch((error) => console.log(error));


    //7-updateMany
    db.collection('user').updateMany({}, {
        $inc: { age: 10 }
    })
        .then((data) => { console.log(data.modifiedCount) })
        .catch((error) => { console.log(error) })

    //8-deleteMany
    db.collection('user').deleteMany({ age: 41 })
        .then((data) => { console.log(data.deletedCount) })
        .catch((error) => { console.log(error) })
})

