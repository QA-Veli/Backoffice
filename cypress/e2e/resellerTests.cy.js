/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

describe('Tests for Reseller role', () => {
  it('Reseller is able to login with valid credential', () => {

    // 00. Login
    cy.visit('/');
    cy.get('[name="username"]').type('cypressTest');
    cy.get('[name="password"]').type('123456');
    cy.get('div').contains('login').click();
    cy.get('span').contains('dashboard').should('be.visible');
  })

  it('Reseller is able to create reseller', () => {

    // Generate random name
    let username = faker.internet.userName();
    let usernameLowerCase = username.toLowerCase();

    // 00. Login
    cy.visit('/');
    cy.get('[name="username"]').type('cypressTest');
    cy.get('[name="password"]').type('123456');
    cy.get('div').contains('login').click();
    cy.wait(2000);
    
    // 01. Open Users page 
    cy.get('div>div.vl-text-13.capitalize').eq(1).click();
    cy.get('div').contains('Users').click();

    // 02. Open Add user page
    cy.get('div').contains('Add user').click();

    // 03. Fill add user forms
    cy.wait(2000);
    cy.get('[placeholder="Create username"]').type(username);
    cy.get('[placeholder="Enter name"]').type('cypress');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="confirmPassword"]').type('123456');
    cy.get('span').contains('Select currencies').click();
    cy.get('._checkbox-label-wrapper_jakm1_18').contains('USD').click();
    cy.get('[placeholder="Enter amount"]').type('10');
    cy.get('.flex > .vl-bg-primary').click();
    cy.wait(1000);

    // 04. User added
    cy.get('.vl-text-16').should('be.visible').contains('User added');
    cy.wait(500);
    cy.get('a>div.vl-text-13').eq(0).should('be.visible').should('have.text', usernameLowerCase);
  });

  it('Reseller is able to create Agent', () => {

    // Generate random name
    const minLength = 6;
    const maxLength = 28;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    let username = '';
    let length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    for (let i = 0; i < length; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // 00. Login
    cy.visit('/');
    cy.get('[name="username"]').type('cypressTest');
    cy.get('[name="password"]').type('123456');
    cy.get('div').contains('login').click();
    cy.wait(2000);
    
    // 01. Open Users page 
    cy.get('div>div.vl-text-13.capitalize').eq(1).click();
    cy.get('div').contains('Users').click();

    // 02. Open Add user page
    cy.get('div').contains('Add user').click();

    // 03. Fill add user forms
    cy.get('div').contains('Agent').click();
    cy.get('[name="websiteUrl"]').type('https://d36d6dg45qtynd.cloudfront.net/users/add-user');
    cy.wait(1000);
    cy.get('[name="username"]').type(username);
    cy.get('[placeholder="Enter name"]').type('cypress');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="confirmPassword"]').type('123456');
    cy.get('span').contains('Select currencies').click();
    cy.get('._checkbox-label-wrapper_jakm1_18').contains('USD').click();
    cy.get('[placeholder="Enter amount"]').type('10');
    cy.wait(1000);
    cy.get('.flex > .vl-bg-primary').click();
    cy.wait(1000);

    // 04. User added
    cy.get('.vl-text-16').should('be.visible').contains('User added');
    cy.wait(500);
    cy.get('a>div.vl-text-13').eq(0).should('be.visible').should('have.text', username);
  });

  it('Reseller is able to Edit user', () => {

    // 00. Login
    cy.visit('/');
    cy.get('[name="username"]').type('cypressTest');
    cy.get('[name="password"]').type('123456');
    cy.get('div').contains('login').click();
    cy.wait(2000);
    
    // 01. Open Users page 
    cy.get('div>div.vl-text-13.capitalize').eq(1).click();
    cy.get('div').contains('Users').click();

    // 02. Open Edit user page
    cy.get('[href="/users/edit-user"]').eq(0).click();

    // 03. Edit user
    cy.get('label').contains('Suspended').click();
    cy.get('[placeholder="Enter name"]').clear().type('was edit by Cypress');
    cy.get('[type="submit"]').eq(0).click();
    cy.wait(1000);

    // 04. User updated
    cy.get('.vl-text-16').should('be.visible').contains('User updated');
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible').and('contain.text', 'was edit by Cypress');
    cy.get('tbody > :nth-child(1) > :nth-child(10)').should('be.visible').and('contain.text', 'SUSPENDED');
  });

  it('Reseller is able to change user password', () => {
    
    // 00. Login
    cy.visit('/');
    cy.get('[name="username"]').type('cypressTest');
    cy.get('[name="password"]').type('123456');
    cy.get('div').contains('login').click();
    cy.wait(2000);
    
    // 01. Open Users page 
    cy.get('div>div.vl-text-13.capitalize').eq(1).click();
    cy.get('div').contains('Users').click();

    // 02. Open Edit user page
    cy.get('[href="/users/edit-user"]').eq(0).click();

    // 03. Open Change password popup
    cy.get('div').contains('Reset password').click();

    // 04. Change password 
    cy.get('[placeholder="New password"]').type('123456');
    cy.get('[placeholder="Confirm New Password"]').type('123456');
    cy.get('div').contains('Update password').click();
    cy.get('div').contains('Password updated').should('be.visible');
  });

  it('Reseller is able to create sub-account with no permission', () => {

    // Generate random name
    const minLength = 6;
    const maxLength = 15;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    let username = '';
    let length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    for (let i = 0; i < length; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // 00. Login
    cy.visit('/');
    cy.get('[name="username"]').type('cypressTest');
    cy.get('[name="password"]').type('123456');
    cy.get('div').contains('login').click();
    cy.wait(2000);
    
    // 01. Open Sub-accounts page 
    cy.get('div>div.vl-text-13.capitalize').eq(1).click();
    cy.get('div').contains('Sub-accounts').click();

    // 02. Open Add sub-account page
    cy.get('div').contains('Add sub-account').click();

    // 03. Fill add Sub forms
    cy.get('[placeholder="Create username"]').type(username);
    cy.get('[placeholder="Enter name"]').type('cypress');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="confirmPassword"]').type('123456');
    cy.get('[type="submit"]').click();
    cy.wait(1000);

    // 04. Sub added
    cy.get('.vl-text-16').should('be.visible').contains('Sub-account added');
    cy.wait(500);
    cy.get('table tbody tr:nth-child(1) td:nth-child(2)').should('be.visible').should('have.text', 'cypresstest@'+username);
  });

  it('User is able to change password', () => {

    // 00. Login
    cy.visit('/');
    cy.get('[name="username"]').type('cypressTest');
    cy.get('[name="password"]').type('123456');
    cy.get('div').contains('login').click();
    cy.wait(2000);

    // 01. Open Profile page
    cy.get('div.justify-center').eq(2).click();
    cy.get('div').contains('profile').click();

    // 02. Open Change password popup
    cy.get('div').contains('Change password').click();

    // 03. Change password 
    cy.get('[placeholder="Old password"]').type('123456');
    cy.get('[placeholder="New password"]').type('123456');
    cy.get('[placeholder="Confirm password"]').type('123456');
    cy.get('div').contains('Update password').click();
    cy.get('div').contains('Password updated').should('be.visible');
  });

  it('Reseller is able to deposit Wallet Credits for user', () => {

    let userCreditBeforeDeposit;
    let userCreditAfterDeposit;

    // 00. Login
    cy.visit('/');
    cy.get('[name="username"]').type('cypressTest');
    cy.get('[name="password"]').type('123456');
    cy.get('div').contains('login').click();
    cy.wait(2000);
    
    // 01. Open Deposit page 
    cy.get('div>div.vl-text-13.capitalize').eq(5).click({force:true});
    cy.get('div').contains('Deposit / Withdrawal').click();

    
    // 02. Add deposit
    cy.get('div').contains('Select').click();
    cy.get('[style="padding-left: 12px;"]').click();
    cy.get('table tbody tr:nth-child(1) td:nth-child(5)').invoke('text').then(parseInt).then(($mainBalance) => {
        // save main balance before deposit
        userCreditBeforeDeposit = $mainBalance
        cy.log(userCreditBeforeDeposit)
      });
    // Click [+] btn
    cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > :nth-child(3)').click();
    
    cy.get('[name="amount"]').type('2');
    cy.get('div.vl-mx-auto').contains('Deposit').click();
    cy.wait(1500);

    // Verify user credit after deposit
    cy.get('table tbody tr:nth-child(1) td:nth-child(5)').invoke('text').then(parseInt).then(($mainBalance) => {
      // save main balance after deposit
      userCreditAfterDeposit = $mainBalance
      cy.log(userCreditAfterDeposit);

      let balanceResult = userCreditAfterDeposit - userCreditBeforeDeposit;

      if (balanceResult === 2) {
        cy.log('Good job!')
      } else {
        throw new Error("test fails here")
      }
    })
  });

  it('Reseller is able to withdraw Wallet Credits for user', () => {

    let userCreditBeforeDeposit;
    let userCreditAfterDeposit;

    // 00. Login
    cy.visit('/');
    cy.get('[name="username"]').type('cypressTest');
    cy.get('[name="password"]').type('123456');
    cy.get('div').contains('login').click();
    cy.wait(2000);
    
    // 01. Open Deposit page 
    cy.get('div>div.vl-text-13.capitalize').eq(5).click({force:true});
    cy.get('div').contains('Deposit / Withdrawal').click();

    
    // 02. Withdraw credit
    cy.get('div').contains('Select').click();
    cy.get('[style="padding-left: 12px;"]').click();
    cy.get('table tbody tr:nth-child(1) td:nth-child(5)').invoke('text').then(parseInt).then(($mainBalance) => {
        // save main balance before withdraw
        userCreditBeforeDeposit = $mainBalance
        cy.log(userCreditBeforeDeposit)
      })
    // Click [-] btn
    cy.get('tbody > :nth-child(1) > :nth-child(5) > :nth-child(1) > :nth-child(1)').click();
    
    cy.get('[name="amount"]').type('9');
    cy.get('div.vl-mx-auto').contains('Withdraw').click();
    cy.wait(1500);

    // Verify user credit after withdraw
    cy.get('table tbody tr:nth-child(1) td:nth-child(5)').invoke('text').then(parseInt).then(($mainBalance) => {
      // save main balance after withdraw
      userCreditAfterDeposit = $mainBalance
      cy.log(userCreditAfterDeposit);

      let balanceResult = userCreditBeforeDeposit - userCreditAfterDeposit;

      if (balanceResult === 9) {
        cy.log('Good job!')
      } else {
        throw new Error("test fails here")
      }
    })
  });

  it('Suspended reseller is not able to add new user', () => {

    // 00. Login
    cy.visit('/');
    cy.get('[name="username"]').type('conor39');
    cy.get('[name="password"]').type('123456');
    cy.get('div').contains('login').click();
    cy.wait(2000);
    cy.get('div').contains('SUSPENDED').should('be.visible');
    
    // 01. Open Users page 
    cy.get('div>div.vl-text-13.capitalize').eq(1).click();
    cy.get('div').contains('Users').click();

    // Check if the Add user btn exists
    cy.get('body').then(($element) => {
      // If element exists, throw error
      if ($element.find('[type="button"]').length > 0) {
        throw new Error("test fails here");
      }
    });
  });
})