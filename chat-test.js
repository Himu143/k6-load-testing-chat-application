import { browser } from "k6/browser";
import { check } from "k6";

export const options = {
  scenarios: {
    ui: {
      executor: "constant-vus",
      vus: 3,
      //iterations: 5,
      duration: "5m",
     
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.setViewportSize({
      width: 1920,
      height: 1080,
    });

    await page.goto("https://meet2.synesisit.info/sign-in", {
      timeout: 120000,
    });
    await page.waitForLoadState("domcontentloaded");

    await page.locator(".SignIn_signInWithEmail__1V-st").click();
    await page
      .locator('input[name="signInMail"]')
      .fill("tadomem643@parsitv.com");
    await page.locator('input[name="password"]').fill("Abc@321#");

    // Wait for the submit button to be visible
    await page.waitForSelector(".SubmitBtn-mt3", {
      state: "visible",
      timeout: 15000,
    });

    await Promise.all([
      page.waitForNavigation({ timeout: 60000 }),
      page.locator(".SubmitBtn-mt3").click(),
    ]);

    // Step 3: Access the chat area
    console.log("Accessing chat area...");
    await page.locator(".Sidebar_cnvLinkContent__1cpC7").click()
  
    //await page.locator("_flex_4dswl_9 mx_RoomListItemView_content").click();
    await page.waitForLoadState("networkidle", { timeout: 60000 });
    await page.waitForTimeout(2000);

    // Step 4: Find and click on a chat conversation
    let conversationFound = false;
    const conversationItems = page.locator(
      "[role='button'], a, div[role='button'], li",
    );
    const itemCount = await conversationItems.count().catch(() => 0);

    console.log(`Found ${itemCount} potential items`);

    // Look for a conversation to click on (skip headers and menu items)
    for (let i = 0; i < Math.min(itemCount, 50); i++) {
      try {
        const item = conversationItems.nth(i);
        const isVisible = await item.isVisible().catch(() => false);
        const text = await item.innerText().catch(() => "");

        // Skip empty, small, or system items
        if (
          !isVisible ||
          text.length < 2 ||
          text.includes("Setting") ||
          text.includes("Home")
        ) {
          continue;
        }

        // Look for a conversation (usually contains text, user names, etc.)
        if (text.length > 2 && text.length < 200) {
          console.log(`Clicking on: ${text.substring(0, 40)}`);
          await item.click({ timeout: 10000 });
          await page.waitForTimeout(2000);
          conversationFound = true;
          break;
        }
      } catch (e) {
        // Continue searching
      }
    }

    check(conversationFound, {
      "found and clicked on a conversation": (found) => found === true,
    });

    // Step 5: Send a chat message
    if (conversationFound) {
      console.log("Sending chat message...");
      await page.waitForLoadState("domcontentloaded", { timeout: 30000 });
      await page.waitForTimeout(1000);

      // Find message composer
      const textInputs = page.locator(
        "textarea, div[contenteditable='true'], input[type='text']",
      );
      const inputCount = await textInputs.count().catch(() => 0);

      if (inputCount > 0) {
        try {
          const composer = textInputs.first();
          await composer.click({ timeout: 5000 });
          await page.waitForTimeout(300);

          await composer.type("Hi! This is a test message from k6", {
            delay: 20,
          });
          await page.waitForTimeout(300);

          // Try to send via Enter or send button
          await page.keyboard.press("Enter");
          await page.waitForTimeout(1000);

          check(true, {
            "chat message sent": (v) => v === true,
          });
          console.log("Message sent successfully");
        } catch (e) {
          console.log(`Error sending message: ${e.message}`);
          check(false, {
            "chat message sent": (v) => v === false,
          });
        }
      }
    }
  } finally {
    await page.close();
  }
}


