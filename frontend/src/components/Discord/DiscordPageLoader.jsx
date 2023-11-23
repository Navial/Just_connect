/* 
Author : Agbassah Steven
Date : octobre / novembre 2023

Composant pour loader le contexte Discord
*/

import UserDiscordPage from "./UserDiscordPage";
import { ProviderWrapper as DiscordProviderWrapper } from '../../contexts/DiscordUserContext'

const DiscordPageLoader = () => {
    return (
        <DiscordProviderWrapper> 
            <UserDiscordPage />
        </DiscordProviderWrapper>
    )

}


export default DiscordPageLoader;