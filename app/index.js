import React, {Component} from 'react';
import ReactDOM from 'react-dom';
/*import {render} from 'react-dom'*/

class PageComponent extends Component {
    state = {
        data: [],
        isActiveCheck: '',
        needIsActiveCheck: false,
        childrensOpenId: {}

    };

    getAllData() {
        fetch(`/getDefaultJsonData`)
            .then(res => res.json())
            .then(json => this.buildTree(json));
    }

    componentDidMount() {
        this.getAllData()
    }

    parentHaveChildrensCheck = (parent) => {

        let openButtonDisplay = false;

        switch (true) {
            case(!this.state.needIsActiveCheck):
                openButtonDisplay = parent.hasOwnProperty('childrens');
                break;

            case(this.state.needIsActiveCheck):
                openButtonDisplay = parent.hasOwnProperty('childrens') &&
                    parent.childrens.filter((item) => {return item.isActive == true}).length != 0
                break;
        }
        return openButtonDisplay
    };


    checkIsActiveCheck = (isActiveArg) => {
        let result = this.state.needIsActiveCheck ? isActiveArg : true;
        return result
    };


    buildTree = (array) => {

        let tree = [];

        array.forEach((item) => {
            item.parentId == 0 && tree.push(item)
        });

        array.forEach((item) => {
            if (item.parentId != 0) {
                tree.find((parent) => {
                    if (parent.id == item.parentId) {
                        parent.hasOwnProperty('childrens') ? '' : parent.childrens = []
                        parent.childrens.push(item)
                    }
                })
            }
        });


        array.forEach((item) => {
            chilcrensCheck(item)
        });

        function chilcrensCheck(seniorChildren) {
            tree.forEach((item) => {

                if (item.hasOwnProperty('childrens')) {

                    item.childrens.find((parent) => {
                        if (parent.id == seniorChildren.parentId) {
                            parent.hasOwnProperty('childrens') ? '' : parent.childrens = []
                            parent.childrens.push(seniorChildren)
                        }
                    })
                }
            })

        }


        this.setState({data: tree})
    };


    render() {
        return (
            <div className="root">


                <ul>

                    <button className={this.state.needIsActiveCheck ? 'filterButton selected' : 'filterButton'} onClick={() => {
                        this.state.needIsActiveCheck ? this.setState({needIsActiveCheck: false}) : this.setState({needIsActiveCheck: true})
                    }}>{this.state.needIsActiveCheck ? 'Отключить фильтр "isActive" ' : 'Включить фильтр "isActive"  '} </button>

                    {this.state.data.map((person) => (
                        this.checkIsActiveCheck(person.isActive) &&
                        <li className="person" key={person.id}>
                            <div className="person-parent">{person.name} | <span
                                className="parnet-balance">{person.balance}</span></div>
                            {
                                this.parentHaveChildrensCheck(person) &&
                                <button
                                    className={this.state.childrensOpenId.hasOwnProperty(person.id) ? 'openButton selected' : 'openButton'}
                                    onClick={
                                        ()=>{
                                            if (this.state.childrensOpenId.hasOwnProperty(person.id)){
                                                let openObj = this.state.childrensOpenId;
                                                delete openObj[person.id];
                                                this.setState({childrensOpenId:openObj})}
                                                else
                                            {
                                                let openObj = this.state.childrensOpenId;
                                                openObj[person.id] = 'open';
                                                this.setState({childrensOpenId:openObj})
                                            }
                                            }
                                    }>{this.state.childrensOpenId.hasOwnProperty(person.id) ? 'Закрыть' : 'Открыть' }</button>
                            }


                            { this.state.childrensOpenId.hasOwnProperty(person.id) && <div className="person-childrens">

                                {
                                    person.hasOwnProperty('childrens') && person.childrens.map((seniorChild) =>

                                      <ul key={seniorChild.id}>
                                            {
                                                this.checkIsActiveCheck(seniorChild.isActive) && <li className="seniorChild">{seniorChild.name} | {seniorChild.balance}

                                                {
                                                    seniorChild.hasOwnProperty('childrens') && seniorChild.childrens.map((juniorChild) =>

                                                        <ul key={juniorChild.id}>
                                                            {this.checkIsActiveCheck(juniorChild.isActive) &&

                                                            <li className="juniorChild" key={juniorChild.id}>

                                                                {juniorChild.name} | {juniorChild.balance}<br />


                                                            </li>}
                                                        </ul>
                                                    )
                                                }

                                            </li>
                                            }
                                      </ul>
                                    )
                                }

                            </div>}

                        </li>)
                    )}
                </ul>
            </div>

        )
    }
}// endofcomponent

ReactDOM.render(<PageComponent/>, document.getElementById('index'));