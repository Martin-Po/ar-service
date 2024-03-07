import { Box, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import EmailIcon from '@mui/icons-material/Email'
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const iconComponents = {
    GitHubIcon,
    PhoneAndroidIcon,
    EmailIcon,
    LanguageIcon,
    FacebookIcon,
    InstagramIcon   
}

const iconColors = {
    GitHubIcon: 'inherit',
    LanguageIcon: 'inherit',
    PhoneAndroidIcon: 'rgb(233 59 129)',
    EmailIcon: 'rgb(253 117 144)',
    FacebookIcon: 'rgb((8 102 255)',
    InstagramIcon: 'inherit'
}



const RedSocial = ({ contacto }) => {
    const IconComponent = iconComponents[contacto.icon]
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.5rem',
                height: '2.5rem',
                width: '2.5rem',
                backgroundColor: 'primary.main',
            }}
        >
            <a
                style={{ display: 'flex', color: iconColors[contacto.icon] }}
                href={contacto.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {IconComponent && <IconComponent />}
            </a>
        </Box>
    )
}

export { RedSocial }
