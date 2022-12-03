import React from "react";

import { TouchableOpacity } from 'react-native';
import { Card, CardImage, CardContent } from 'react-native-cards';
import { getImagem } from "../../api";

import {
    NomeEmpresa,
    NomeProduto,
} from '../../assets/styles';

export default class FeedCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feed: this.props.feed,
            navegador: this.props.navegador

        }
    }

    render = () => {
        const { feed, navegador } = this.state
        return (
            <TouchableOpacity onPress={
                () => {
                    navegador.navigate("Detalhes", { feedId: feed._id })
                }
            }>
                <Card style={{ borderRadius: 10 }}>
                    <CardImage source={getImagem(feed.imagem)} />
                    <CardContent>
                        <CardContent style={{ backgroundColor: '#f0f0f0', marginTop: -40, borderRadius: 15 }}>
                            <NomeEmpresa>{feed.category.name}</NomeEmpresa>
                        </CardContent>
                    </CardContent>
                    <CardContent>
                        <NomeProduto>{feed.product.name}</NomeProduto>
                    </CardContent>
                </Card>
            </TouchableOpacity>
        );
    }
}