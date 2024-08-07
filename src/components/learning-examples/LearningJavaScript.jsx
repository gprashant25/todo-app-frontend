
const person = {
    name: 'Ranga Karananm',
    address: {
        line1: 'Baker Street',
        city: 'London',
        country: 'UK'
    },
    profiles: ['twitter','Linkdin' ,'Instagram'],

    printProfile: () => {

        person.profiles.map(
            profile => console.log(profile)
        )
      //  console.log(person.profiles[0])
    }


}



export default function LearningJavaScript(){
    return (
        <>
        <div> {person.name} </div>
        <div> {person.address.line1} </div>
        <div> {person.printProfile()} </div>
        </>
    )
}