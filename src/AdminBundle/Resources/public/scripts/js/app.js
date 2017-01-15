console.time('appAll');

window.ee	=	new	EventEmitter();


//	---	Uncontrolled	Components	(неконтролируемый компонент)	---
var	UncontrolledTestInput	=	React.createClass({
    componentDidMount:	function()	{	//ставим	фокус	в	input
        ReactDOM.findDOMNode(this.refs.myTestInput).focus();

        // {/* componentDidMount - один из методов lifecycle компонентов*/}
    },
    onBtnClickHandler:	function()	{
        console.log(this.refs);
        alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    },
    render:	function()	{
        return	(
            <div>
                <input
                    className='test-input'
                    defaultValue=''
                    placeholder='введите	значение'
                    ref='myTestInput'
                        />
                <button	onClick={this.onBtnClickHandler} ref='alert_button'>Показать	alert</button>
            </div>
        );
    }
});

var	Add	=	React.createClass({
    componentDidMount:	function()	{
        // После загрузки компонента сделать поле автора активным
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    getInitialState:	function()	{	//устанавливаем	начальное	состояние	(state)
        return	{
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },
    componentWillReceiveProps:	function(nextProps)	{
        // Возврат Add компонента в начальное состояние
        this.replaceState(this.getInitialState());
        ReactDOM.findDOMNode(this.refs.form).reset()
    },
    onBtnClickHandler:	function(e)	{
        e.preventDefault();
        var	author	=	ReactDOM.findDOMNode(this.refs.author).value;
        var	text	=	ReactDOM.findDOMNode(this.refs.text).value;
        var	item	=	[{
            author:	author,
            text:	text,
            bigText:	'...'
        }];

        window.ee.emit('News.add',	item);
    },
    onCheckRuleClick:	function(e)	{
        this.setState({agreeNotChecked:	!this.state.agreeNotChecked});
    },
    onFieldChange:	function(fieldName,	e)	{
        if	(e.target.value.trim().length	>	0)	{
            this.setState({[''+fieldName]:false})
        }	else	{
            this.setState({[''+fieldName]:true})
        }
    },
    render:	function()	{
        var	agreeNotChecked	=	this.state.agreeNotChecked,
            authorIsEmpty	=	this.state.authorIsEmpty,
            textIsEmpty	=	this.state.textIsEmpty;

        return	(
            <form	className='add	cf' ref='form'>
                        <input
                    type='text'
                    className='add__author'
                    onChange={this.onFieldChange.bind(this,	'authorIsEmpty')}
                    placeholder='Ваше имя'
                    ref='author'
                        />
                        <textarea
                    className='add__text'
                    onChange={this.onFieldChange.bind(this,	'textIsEmpty')}
                    placeholder='Текст новости'
                    ref='text'
                        ></textarea>
                    <label	className='add__checkrule'>
                    <input	type='checkbox'	ref='checkrule'	onChange={this.onCheckRuleClick}/>Я	с
                огласен	с	правилами
                </label>
                {/*	берем	значение	для	disabled	атрибута	из	state	*/}
                <button
                className='add__btn'
                onClick={this.onBtnClickHandler}
                ref='alert_button'
                disabled={agreeNotChecked || authorIsEmpty	||	textIsEmpty}
                >
                Добавить
                </button>
            </form>
        );
    }
});

var	TestInput	=	React.createClass({
    getInitialState:	function()	{
        return	{
            myValue:	false
        };
    },
    onChangeHandler:	function(e)	{
        this.setState({myValue:	e.target.value})
    },
    onBtnClickHandler:	function()	{
        alert(this.state.myValue);
    },
    render:	function()	{
        return	(
            <div>
                <input
                    className='test-input'
                    value={this.state.myValue}
                    onChange={this.onChangeHandler}
                    placeholder='введите	значение'
                        />
                <button	onClick={this.onBtnClickHandler}>Показать	alert</button>
            </div>
        );
    }
});

var Article = React.createClass({
    propTypes:	{
        data:	React.PropTypes.shape({
            author:	React.PropTypes.string.isRequired,
            text:	React.PropTypes.string.isRequired,
            bigText:	React.PropTypes.string.isRequired
        })
    },
    // Начальное состояние компонента
    getInitialState:	function()	{
        return	{
            visible:	false,
            vote: 0,
            likesIncreasing : null
        };
    },
    readmoreClick:	function(e)	{
        e.preventDefault();
        this.setState({visible:	true}, function () {
            console.log('Callback функция вызываемая при изменении состояния');
        });
    },
    voteClick: function (e) {
        e.preventDefault();
        this.setState({vote: ++this.state.vote});
    },
    render:	function()	{
        var	data = this.props.data,
            votes = this.state.vote,
            visible	=	this.state.visible;	//	считываем	значение	переменной	из	состояния	компонента

        // с помощью проверки visible - проверяем состояние
        return	(
            <div	className="article">
            <p	className="news__author">{data.author}:</p>
            <p	className="news__text">{data.text}</p>
            <a	href="#"
                onClick={this.readmoreClick}
                className={'news__readmore ' + (visible	?	'none':	'')}>
                    Подробнее
            </a>
            <p	className={'news__big-text ' + (visible	?	'':	'none')}>{data.bigText}</p>
            <p >{votes}
                <a href="/"
                    className="news__vote"
                    onClick={this.voteClick}>+
                </a>
            </p>
        </div>
        )
    }
});

var	News = React.createClass({
    propTypes:	{
        data: React.PropTypes.array.isRequired
    },
    getInitialState:	function()	{
        return	{
            counter:	0
        }
    },
    render:	function()	{
        var	data = this.props.data;

        var	newsTemplate = data.length ? data.map(function(item,	index)	{
            return	(
                <div key={index}>
                    <Article data={item} />
                </div>
            );
        }) : <p>К сожалению новостей нет</p>;

        return (
            <div className="news">
            <strong	className={data.length	>	0	?	'':'none'}>
                Всего	новостей:	{data.length}</strong><br />
                {newsTemplate}
            </div>
        );
    }
});

var comment = {
    desc: "Хреновые сегодня новости!"
};

var	myNews	=	[
    {
        author:	'Саша Печкин',
        text:	'В	четверг,	четвертого	числа...',
        bigText:	'в	четыре	с	четвертью	часа	четыре	чёрненьких	чумазеньких	чертёнка	чертили ' +
        'чёрными	чернилами	чертёж.'
    },
    {
        author:	'Просто	Вася',
        text:	'Считаю, что $ должен стоить 35	рублей!',
        bigText:	'А	евро	42!'
    },
    {
        author:	'Гость',
        text:	'Бесплатно.	Скачать. Лучший	сайт - http://localhost:3000',
        bigText:	'На	самом	деле	платно,	просто	нужно	прочитать	очень	длинное	лицензионное соглашение'
    }
];

var	App	= React.createClass({
    getInitialState:	function()	{
        return	{
            news: myNews
        };
    },
    componentDidMount:	function()	{
        //	Слушай	событие	"Создана	новость"  если	событие	произошло,	обнови	this.state.news
        var	self	=	this;
        window.ee.on('News.add', function(item)	{
            var	nextNews = item.concat(self.state.news);
            self.setState({news:	nextNews});
        });
    },
    componentWillUnmount:	function()	{
        // Больше	не	слушай	событие	"Создана	новость"
        window.ee.off('News.add');
    },
    render:	function()	{
        return (
            <div className="news-page"> {/* JSX	- стиль */}

            <TestInput	/>	{/*	добавили	вывод	компонента	*/}
            <UncontrolledTestInput	/>	{/*	добавление неконтролируемого компонента	*/}
            <hr />
            <p>Добавить новость</p>
        <Add	/>	{/*	добавление неконтролируемого компонента	*/}


            <h3>Новости</h3>

            <News	data={this.state.news}	/>
        </div>
        );
    }
});

console.time('app');

ReactDOM.render(
    <App />,
    document.getElementById('content')
);


console.timeEnd('appAll');
console.timeEnd('app');

// 41 стр.
