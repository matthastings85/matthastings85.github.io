import assert from 'assert';

it('has a text input', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');

  assert(input);
});

it('shows a success message with a valid email', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'abcd@abcd.com';
  
  const form = dom.window.document.querySelector('form');

  form.dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  assert.strictEqual(h1.innerHTML, 'looks good');
});

it('shows a fail message with a invalid email', async () => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'abcdabcd.com';
  
  const form = dom.window.document.querySelector('form');

  form.dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  assert.strictEqual(h1.innerHTML, 'invalid email');
});