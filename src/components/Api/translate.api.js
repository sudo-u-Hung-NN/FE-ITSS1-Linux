import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Convert = ({ text }) => {
  const [convertedText, setConvertedText] = useState('');

  useEffect(() => {
    const response = axios
      .post(
        'https://deep-translator-api.azurewebsites.net/google/',
        {
            "source": "auto",
            "target": "vi",
            "text": text,
            "proxies": []
        }
      )
      .then((response) => {
        setConvertedText(response);
      })
      .catch((err) => {
        console.log('rest api error', err);
      });
  });

  return convertedText;
};

export default Convert;