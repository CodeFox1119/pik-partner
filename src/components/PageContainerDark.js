import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    RefreshControl,
    StatusBar,
    View, ScrollView, KeyboardAvoidingView,
} from 'react-native';
import {BLACK, COLOR_PRIMARY_900, PAGE_PADDING} from '../utils/constants';

class PageContainerDark extends React.Component {
    constructor(props){
        super(props)
        this.scroll = null
    }

    scrollToEnd(){
        this.scroll.scrollToEnd();
    }

    render() {
        let {children, Header, footer, noScroll, contentStyle, contentWrapperStyle, refreshing, onRefresh} = this.props;
        return <View style={styles.container}>
            {!!Header && (
                <View style={styles.headerWrapper}>
                    {Header}
                </View>
            )}
            <View style={[styles.contentWrapper, contentWrapperStyle]}>
                {noScroll ? (
                    <View style={[styles.content, contentStyle]}>
                        {children}
                    </View>
                ) : (
                    <ScrollView
                        ref={(scroll) => {this.scroll = scroll;}}
                        refreshControl={
                            !!onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : null
                        }
                    >
                        <View style={[styles.content, contentStyle]}>
                            {children}
                        </View>
                    </ScrollView>
                )}
                {!!footer && footer}
            </View>
        </View>;
    }
}

PageContainerDark.propTypes = {
    Header: PropTypes.element,
    contentStyle: PropTypes.object,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // flexGrow: 1,
        backgroundColor: COLOR_PRIMARY_900,
        width: '100%', height: '100%',
    },
    headerWrapper: {
        backgroundColor: BLACK,
        flexGrow: 0,
    },
    contentWrapper: {
        flex: 1,
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',
        // marginTop: -30,
        // padding: PAGE_PADDING,
        paddingBottom: 0,
    },
    content: {
        padding: PAGE_PADDING,
    },
    footerContainer: {
        flexGrow: 0,
        flexDirection: 'row',
    },
});

export default PageContainerDark;
