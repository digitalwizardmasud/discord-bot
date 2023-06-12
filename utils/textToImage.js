require("dotenv").config();
const axios = require("axios");

module.exports = (prompt) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://stablediffusionapi.com/api/v3/text2img", {
        key: process.env.STABLEDIFFUSION_KEY,
        prompt: prompt,
        negative_prompt: "poor, bad, unstylish",
        width: "512",
        height: "512",
        samples: "4",
        num_inference_steps: "20",
        safety_checker: "no",
        enhance_prompt: "no",
        seed: null,
        guidance_scale: 7.5,
        multi_lingual: "no",
        panorama: "no",
        self_attention: "no",
        upscale: "no",
        embeddings_model: "embeddings_model_id",
        webhook: null,
        track_id: null,
      })
      .then((res) => {
        if (res.data.status == "success") {
            console.log('success 1');
            resolve(res.data.output);
        }
        if (res.data.status == "processing") {
          const interval = setInterval(() => {
            axios.post(
              "https://stablediffusionapi.com/api/v4/dreambooth/fetch",
              {
                key: process.env.STABLEDIFFUSION_KEY,
                request_id: res.id,
              }
            ).then(result=>{
                if(result.data.status=="success"){
                    console.log('success 2');
                    resolve(result.data.output)
                    clearInterval(interval)
                }
            })
            .catch(err=>{
                console.log(err);
            })
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err, "image generate error");
      });
  });
};
