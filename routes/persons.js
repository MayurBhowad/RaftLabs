var express = require('express');
var router = express.Router();

const PersonSchema = require('../models/person.model');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addrelation', async function (req, res, next) {
  const { person1, person2, relation1, relation2 } = req.body;
  // res.json(`${person1} is ${relation1} of ${person2} and ${person2} is ${relation2} of ${person1}`);


  let messagesss = {}
  //FIRST RELATION
  newRelationSchema(person1, relation2, person2).then((message) => {
    if (message) { messagesss.person1 = message }
    //SECOND RELATION
    newRelationSchema(person2, relation1, person1).then((message1) => {
      if (message1) { messagesss.person2 = message1 }
      if (messagesss) {
        res.json(messagesss)
      } else {
        res.json({ message: 'Realations added' })
      }
    })
  })
    .catch(err => console.log('reject', err))
})

router.get('/findrelation', async (req, res, next) => {
  const { person1, person2 } = req.query;
  // const { person1, person2 } = req.body;
  // res.json(req.query)
  let relationString = await findRelation(person1, person2)
  res.json(relationString)
})



//route:    GET /findrelation
//OPRATION ON DATA FOR SEARCHING RELATIONS
let getRelationPromise = new Promise((resolve, reject) => {

})
const findRelation = (person1, person2) => {
  return new Promise((resolve, reject) => {


    let stop = false;
    // let queue = new Array()
    let queue = [];
    let visitedArray = [];
    // let finale_Queue = new Array()
    let final_Queue = [];

    // let relations = []
    function processQ() {
      // ... this will be called on each .push
      queue.forEach(item => {
        if (item === person2) {
          if (visitedArray.includes(item)) {
          } else {
            // console.log('Pushing to visitedArray');
            visitedArray.push(item)
          }
          stop = true;
          // console.log('relation round complte');
          // console.log(visitedArray);
          // final_Queue = visitedArray
          console.log('visitedArray: ', visitedArray);
          resolve(visitedArray)
          minimize(visitedArray)
          return visitedArray;
        } else {
          if (stop) {
          } else {
            getRelations(item);
            if (visitedArray.includes(item)) {
            } else {
              // console.log('Pushing to visitedArray');
              visitedArray.push(item)
            }
          }
        }
      })
    }

    // var queue = [];
    queue.push = function () { Array.prototype.push.apply(this, arguments); processQ(); };
    queue.push(person1);

    function getRelations(person) {
      PersonSchema.findOne({ name: person })
        .then(details => {
          const { relations } = details;
          // console.log('queue: ', queue);
          // console.log('Visited: ', visitedArray);
          relations.map(item => {
            if (queue.includes(item.person_name)) {
            } else {
              if (visitedArray.includes(item.person_name)) {
              } else {
                // console.log('Pushing to queue');
                queue.push(item.person_name);
              }
            }
          })
          queue.shift();
        })
    }
  })
}

function minimize(arrayList) {
  let arrayLast = arrayList.length - 1
  for (let i = arrayList.length - 1; i >= 0; i--) {

  }
}



// route:   POST /addrelation
//OPERATION ON DATA OF ADDING RELATIONS
const newRelationSchema = (firstPerson, relation, secondPerson) => {
  return new Promise((resolve, reject) => {

    PersonSchema.findOne({ name: firstPerson })
      .then(person => {
        if (person) {
          const newRelation = {
            relation: relation,
            person_name: secondPerson
          }

          //IS SECOND PERSON ALREADY ADDED TO RELATIOS?
          const subRelationPromise = new Promise((resolve, reject) => {
            person.relations.map(person_data => {
              if (person_data.person_name === secondPerson) {
                //YES! FOUND ->
                reject(`${secondPerson} is already added as ${firstPerson}'s ${person_data.relation}.`)
              } else {
                // NO! NOT-FOUND ->
                resolve()
              }
            })
          })

          //SECOND PERSON SEARCH COMPELTED! NEXT->
          subRelationPromise.then(() => {
            //YES! FOUND
            person.relations.unshift(newRelation);
            person.save()
              .then(() => { resolve(`${secondPerson} is added as ${firstPerson}'s ${relation}.`) })
              .catch(err => console.log(err));
          })
            //NO! NOT-FOUND ->
            .catch(msg => { resolve(msg) })

        } else {
          //FIRST PERSON ADDING TO DB
          PersonSchema.create({ name: firstPerson }).then(person => {
            const newRelation = {
              relation: relation,
              person_name: secondPerson
            }
            person.relations.unshift(newRelation);
            person.save()
              .then(() => { resolve(`${secondPerson} is added as ${firstPerson}'s ${relation}.`) })
              .catch(err => console.log(err));
          })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err))
  })
}

module.exports = router;
