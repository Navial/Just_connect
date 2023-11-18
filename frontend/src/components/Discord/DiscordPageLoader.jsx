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