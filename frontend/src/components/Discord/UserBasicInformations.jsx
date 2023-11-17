import { Col } from 'react-bootstrap';

const UserInformations = ({user}) => {
    return (
        <Col>
            <h2 className="mb-4 title">Informations de l'utilisateur</h2>
              <ul className="list-group user-info-list">
                <li className="list-group-item ">Nom: {user.username}</li>
                <li className="list-group-item">Global Name: {user.global_name}</li>
                <li className="list-group-item">Langue utilisée sur discord : {user.locale}</li>
                <li className="list-group-item">
                  Avatar: <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="Avatar" className="img-fluid" />
                </li>
              </ul>
        </Col>
    )

}

export default UserInformations;