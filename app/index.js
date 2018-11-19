import React, {Component} from 'react';
import ReactDOM from 'react-dom';
/*import {render} from 'react-dom'*/

class PageComponent extends Component {
    state = {
        data: [],
        isActiveCheck: '',
        needIsActiveCheck: false,
        childrensOpenId: null
    };

    getAllData() {
        fetch(`/getDefaultJsonData`)
            .then(res => res.json())
            .then(json => this.buildTree(json));
    }

    componentDidMount() {
        this.getAllData()
    }

    checkIsActiveCheck = (isActiveArg) => {
        let result = this.state.needIsActiveCheck ? isActiveArg : true;
        return result
    };


    buildTree = (array) => {

        let newTree = [];

        array.map((parent) => {
            let _parent = parent;
            let childId = parent.parentId;

            switch (true) {
                case(childId == 0)  :
                    newTree.push(_parent);
                    break;

                case(childId !== 0)  :
                    newTree.find(
                        (item) => {
                            console.log('child');
                            if (item.id == childId) {
                                item.hasOwnProperty('childrens') ? '' : item.childrens = [];
                                item.childrens.push(_parent)
                            }
                        });
                    break;
            }
        });

        this.setState({data: newTree})
    };


    render() {
        return (
            <div className="root">
                <button onClick={()=>{this.state.needIsActiveCheck ? this.setState({needIsActiveCheck: false}): this.setState({needIsActiveCheck: true})}}>filter</button>
                <button onClick={() => {
                    console.log(this.state.data, '----', Array.isArray(this.state.data))
                }}>TEST STATE
                </button>
                <button onClick={() => {
                    console.log(this.state.data[2].childrens)
                }}>TEST CHILD
                </button>

                {this.state.data.map((person) => (

                        this.checkIsActiveCheck(person.isActive) && <div className="person" key={person.id}>
                            <div className="person-parent">{person.name} | <span
                                className="parnet-balance">{person.balance}</span></div>

                            {person.hasOwnProperty('childrens') && <button
                                onClick={()=>{this.state.childrensOpenId !== person.id ?
                                    this.setState({childrensOpenId: person.id}) :
                                    this.setState({childrensOpenId: null}) } }>
                                {this.state.childrensOpenId !== person.id ? ' Развернуть ' : ' Свернуть '}
                            </button>}

                            { this.state.childrensOpenId == person.id && <div className="person-childrens">

                                {
                                    person.hasOwnProperty('childrens') && person.childrens.map((child) =>

                                        this.checkIsActiveCheck(child.isActive) &&

                                        <div className="child" key={child.id}>{child.name}</div>
                                    )
                                }

                            </div>}

                        </div>



                    )
                )
                }
            </div>

        )
    }
}// endofcomponent

ReactDOM.render(<PageComponent/>, document.getElementById('index'));