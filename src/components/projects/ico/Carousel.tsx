import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface CarouselSlide {
  title: string;
  content: string;
  flag?: string;
}

const Carousel = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Detect mobile for disabling interactions
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  const carouselItems: CarouselSlide[] = [
    {
      title: "Detailed Credits",
      content: "Save your credits in the form of tables of coins, banknotes or even cheques, each with the sum of quantities, totals and even the weight of the coins!"
    },
    {
      title: "Simple Debits or Invoices",
      content: "Choose between simply recording your debits by sum, date, title and category, or recording your entire invoices, including invoice number and dates of issue or sale/service."
    },
    {
      title: "Detailed Products",
      content: "Detail each product on your invoices with a name, unit price, quantity and even percentage and static discounts. Ico takes care of the rest."
    },
    {
      title: "Countries",
      content: "Specify which country your invoice comes from, and use the appropriate fields to identify the seller and customer! \n\n * Countries currently supported are : France 🇫🇷",
    },
    {
      title: "VAT",
      content: "Simply complete your invoice with the VAT percentages, and Ico will calculate the prices for each product and the total invoice, excluding VAT and VAT. Then, get the VAT on each invoice."
    }
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        overflow: 'hidden',
        // borderRadius, boxShadow, and border removed for a cleaner look
      }}
    >
      {mounted && (
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ 
            clickable: !isMobile,
            bulletActiveClass: 'swiper-pagination-bullet-active',
            bulletClass: 'swiper-pagination-bullet',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          allowTouchMove={!isMobile}
          style={{
              width: '100%',
              '--swiper-pagination-color': theme.palette.mode == "light" ? '#000000' : '#ffffff',
              '--swiper-pagination-bullet-inactive-color': theme.palette.mode == "light" ? '#202020' : '#f0f0f0',
              '--swiper-pagination-bullet-inactive-opacity': '0.5',
              '--swiper-pagination-bullet-size': '10px',
              '--swiper-pagination-bullet-horizontal-gap': '6px'
          } as React.CSSProperties}

        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={index}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  padding: 4,
                  paddingBottom: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                  minHeight: '300px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: 2,
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      color: theme.palette.text.primary,
                      mb: 2,
                      fontFamily: '"Aileron", Arial, Helvetica, sans-serif',
                      fontSize: { xs: '1.7rem', sm: '2.15rem', md: '2.4rem' },
                      letterSpacing: '0.02em',
                      lineHeight: 1.15,
                    }}
                  >
                    <Box component="span" sx={{ mr: 1 }}>
                      {item.title}
                    </Box>
                    {item.flag && (
                      <Box component="span" sx={{ fontSize: '1.7rem' }}>
                        {item.flag}
                      </Box>
                    )}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.primary,
                      maxWidth: '600px',
                      lineHeight: 1.7,
                      fontFamily: '"Aileron", Arial, Helvetica, sans-seriCf',
                      fontSize: { xs: '1.03rem', sm: '1.07rem', md: '1.13rem' },
                      fontWeight: 300
                    }}
                  >
                    {item.content.split('\n').map((line, idx, arr) => (
                      <span key={idx}>
                        {line}
                        {idx < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </Typography>
                </Box>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};

export default Carousel;