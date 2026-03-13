let recorder
let chunks=[]

async function startRecording(){

const stream=await navigator.mediaDevices.getUserMedia({audio:true})

recorder=new MediaRecorder(stream)

recorder.ondataavailable=e=>{
chunks.push(e.data)
}

recorder.onstop=async ()=>{

const blob=new Blob(chunks)

let form=new FormData()
form.append("file",blob,"audio.wav")

let res=await fetch("http://127.0.0.1:8000/transcribe",{
method:"POST",
body:form
})

let data=await res.json()

document.getElementById("outputText").value=data.text
}

recorder.start()

setTimeout(()=>{
recorder.stop()
},4000)

}

document.getElementById("recordBtn").onclick=startRecording


function uploadFile(){

const file=document.getElementById("audioFile").files[0]

let form=new FormData()
form.append("file",file)

fetch("http://127.0.0.1:8000/transcribe",{
method:"POST",
body:form
})
.then(res=>res.json())
.then(data=>{
document.getElementById("outputText").value=data.text
})

}

function transcribe(){
alert("Audio will be processed")
}