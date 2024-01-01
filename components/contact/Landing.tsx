import React from 'react';
import {BackgroundImage, Center, Text, Box} from "@mantine/core";

const Landing = () => {
    return (
        <Box mx="auto" className="w-full min-h-[800px]" >
            <BackgroundImage src="/images/contact.jpg" >
                <Center p={"md"} >
                    <Text c={"white"} size="xl" p="md">
                        <p className="text-8xl" >
                            Hero Section for contact page
                        </p>
                    </Text>
                </Center>
            </BackgroundImage>
        </Box>
    );
};

export default Landing;
