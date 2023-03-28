import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const URL = 'api/';
const KEY = '33430043-ea2e6cd9e5af99544c3ccfafc';
const PER_PAGE = 12;

const instanceAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 1500,
});

function getParamReguest(textQuery, numberPage) {
  return {
    key: KEY,
    image_type: 'photo',
    pretty: true,
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page: numberPage,
    q: textQuery,
  };
}

async function getImage(textQuery, numberPage = 1, controller) {
  if (textQuery === '')
    return {
      itemsGallary: [],
      noMore: false,
    };

  try {
    const response = await instanceAxios.get(URL, {
      params: getParamReguest(textQuery, numberPage),
      signal: controller.signal,
    });

    const { hits: arrayFindElement, totalHits } = response.data;
    const countShow = numberPage * PER_PAGE;

    return {
      itemsGallary: arrayFindElement,
      noMore: countShow <= totalHits,
    };
  } catch (error) {
    console.log('error fetch');

    return {
      itemsGallary: [],
      noMore: false,
    };
  }
}

export default getImage;
