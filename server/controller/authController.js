import { executeQuery, isPasswordEqualHashPassword, assignToken } from "../helper.js"

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body
        const result = await executeQuery('call asc_web_login(?)', [email])
        const dtSet1 = result[0];
        
        if(dtSet1[0].Message && dtSet1[0].Message === 'User Not found') return res.status(404).send({message:'No user account found'})
        const {password: hashPassword} = dtSet1[0];
        if(!isPasswordEqualHashPassword(hashPassword, password)) return res.status(404).send({message:'Email and password mismatch'})
        const token = await assignToken({
            firstname: dtSet1[0]['first_name'],
            lastname: dtSet1[0]['last_name'],
            email: dtSet1[0]['email_address'],
            rolename: dtSet1[0]['rolename'],
            roleid: dtSet1[0]['roleid'],
            asc_web: dtSet1[0]['asc_web'],
            asc_mobile: dtSet1[0]['asc_mobile']
        })
        const result2 = await executeQuery('call asc_page_access_fetch(?,0)', [dtSet1[0]['roleid']])
        const result3 = await executeQuery('call DSH_fetch_territory(?)', [dtSet1[0]['roleid']])
        const dt1 = [...result3[1]];
        let groupbyState = dt1.reduce((accumulator,currentValue) => {
            accumulator[currentValue['state'].trim()] = [...accumulator[currentValue['state'].trim()] || [], currentValue]
            return accumulator;
        }, {})
        return res.status(200)
                .send({message:'Operation Successful',
            user: {
                firstname: dtSet1[0]['first_name'],
                lastname: dtSet1[0]['last_name'],
                email: dtSet1[0]['email_address'],
                rolename: dtSet1[0]['rolename'],
                roleid: dtSet1[0]['roleid'],
                asc_web: dtSet1[0]['asc_web'],
                asc_mobile: dtSet1[0]['asc_mobile']
            },
            token,
            pages: result2[0],
            states: result3[0],
            localGovernment:groupbyState,
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({message: 'Some errors were encountered',error})
    };
    
}