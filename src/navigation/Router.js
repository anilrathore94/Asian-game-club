import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Splash from '../Screen/Splash';
import Login from '../Screen/Login';
import BottomTabs from './BottomTabs';
import Profile from '../Screen/Profile';
import Recharge from '../Screen/Recharge';
import RechargeRecord from '../Screen/RechargeRecord';
import Withdrawal from '../Screen/Withdrawal';
import Register from '../Screen/Register';
import BankDetails from '../Screen/BankDetails';
import About from '../Screen/About';
import PrivacyPolicy from '../Screen/PrivacyPolicy';
import WithdrawalRecord from '../Screen/WithdrawalRecord';
import Promotion from '../Screen/Promotion';
import PromotionList from '../Screen/PromotionList';
import Transaction from '../Screen/Transaction';
import ApplyCommission from '../Screen/ApplyCommission';
import CommissionRecord from '../Screen/CommissionRecord';
import FundTransfer from '../Screen/FundTransfer';
import FundHistory from '../Screen/FundHistory';

const Stack = createStackNavigator(),
    PromoStack = props => {
        return <Stack.Navigator  screenOptions={{
            headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }} presentation="card" initialRouteName={"Splash"} {...props}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Tabs" component={BottomTabs} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Recharge" component={Recharge} />
            <Stack.Screen name="RechargeRecord" component={RechargeRecord} />
            <Stack.Screen name="Withdrawal" component={Withdrawal} />
            <Stack.Screen name="BankDetails" component={BankDetails} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="WithdrawalRecord" component={WithdrawalRecord} />
            <Stack.Screen name="Promotion" component={Promotion} />
            <Stack.Screen name="PromotionList" component={PromotionList} />
            <Stack.Screen name="Transaction" component={Transaction} />
            <Stack.Screen name="ApplyCommission" component={ApplyCommission} />
            <Stack.Screen name="CommissionRecord" component={CommissionRecord} />
            <Stack.Screen name="FundTransfer" component={FundTransfer} />
            <Stack.Screen name="FundHistory" component={FundHistory} />


        </Stack.Navigator>
    }
 
  
export default function Router() {
    let ref = React.useRef(null),
        linking = {
            prefixes: ['google.com', 'google.com'],
            config: {
                screens: {
                    Home: 'feed/:sort'
                }
            }
        }
    let initialScreen = 'Promo'
    return <NavigationContainer ref={ref} linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName={"Promo"}  >
            <Stack.Screen name="Promo" component={PromoStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
}