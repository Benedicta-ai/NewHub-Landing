import { motion } from "framer-motion";

const particles = Array.from({length:45});

export default function BlobParticles(){

return(

<>

{particles.map((_,i)=>{

const radius=170+Math.random()*90;

const angle=(360/45)*i;

const size=2+Math.random()*5;

return(

<motion.div

key={i}

className="absolute left-1/2 top-1/2"

animate={{

rotate:360

}}

transition={{

duration:20+i,

repeat:Infinity,

ease:"linear"

}}

>

<div

style={{

transform:`rotate(${angle}deg) translateX(${radius}px)`

}}

>

<motion.div

style={{

width:size,

height:size,

boxShadow:"0 0 20px #F0199A",

}}

className="rounded-full bg-pink-400"

animate={{

opacity:[.2,1,.2],

scale:[1,1.8,1]

}}

transition={{

duration:2+i*.1,

repeat:Infinity

}}

/>

</div>

</motion.div>

)

})}

</>

)

}