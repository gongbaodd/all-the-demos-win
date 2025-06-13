import './style.css'
import { pipeline } from "@huggingface/transformers";

async function main() {
  // const reviewer = await pipeline('sentiment-analysis', 'Xenova/bert-base-multilingual-uncased-sentiment');
  // const result = await reviewer('The Shawshank Redemption is a true masterpiece of cinema.');

  // console.log(result);

  // const pipe = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
  //   dtype: "fp32",
  // });

  const translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M', {
    progress_callback: (progress) => {
      console.log(`Progress: ${JSON.stringify(progress)}`);
    }
  });
  const result = await translator('Hello, how are you?', {
    src_lang: 'eng_Latn',
    tgt_lang: 'ell_Grek'
   });
   console.log(result);
}

main().catch(console.error);