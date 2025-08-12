
function toPayment(e){
  e.preventDefault();
  const bw = parseInt(document.getElementById('bw').value||0);
  const color = parseInt(document.getElementById('color').value||0);
  const confirmed = document.getElementById('confirmOrder').checked;
  if(!confirmed){ alert('Please confirm that you want to order and will pay.'); return false; }
  const total = bw*1 + color*3;
  const params = new URLSearchParams();
  params.set('o_name', document.getElementById('o_name').value);
  params.set('o_roll', document.getElementById('o_roll').value);
  params.set('bw', bw);
  params.set('color', color);
  params.set('total', total);
  window.location = 'payment.html?' + params.toString();
  return false;
}

function goNext(e){
  e.preventDefault();
  const fn = document.getElementById('fullname').value;
  const roll = document.getElementById('roll').value;
  if(!fn||!roll){ alert('Please enter name and roll/ID'); return false; }
  const params = new URLSearchParams();
  params.set('fullname', fn);
  params.set('roll', roll);
  window.location = 'delivery.html?' + params.toString();
  return false;
}

function goConfirm(e){
  e.preventDefault();
  const pay_method = document.getElementById('pay_method').value;
  const urlp = new URLSearchParams(window.location.search);
  urlp.set('pay_method', pay_method);
  // forward to confirm where final submission occurs
  window.location = 'confirm.html?' + urlp.toString();
  return false;
}

window.addEventListener('load', function(){
  const url = new URL(location.href);
  const total = url.searchParams.get('total');
  if(total){
    const el = document.querySelector('.container');
    const p = document.createElement('p');
    p.textContent = 'Order total: Rs. ' + total;
    el.insertBefore(p, el.children[3]);
    // populate order_total if present on confirm page load later
  }
  const upi = 'upi://pay?pa=8972548589@ibl&pn=STUROX&cu=INR';
  const phonepe = document.getElementById('phonepeLink');
  if(phonepe) phonepe.href = upi;
  const paytm = document.getElementById('paytmLink');
  if(paytm) paytm.href = upi;
  const gpay = document.getElementById('gpayLink');
  if(gpay) gpay.href = upi;

  // fill confirm fields from query params if present
  const urlp = new URLSearchParams(window.location.search);
  const fn = urlp.get('fullname') || urlp.get('o_name') || '';
  const roll = urlp.get('roll') || urlp.get('o_roll') || '';
  const totalOnQuery = urlp.get('total') || '';
  if(document.getElementById('f_name')) document.getElementById('f_name').value = fn;
  if(document.getElementById('f_roll')) document.getElementById('f_roll').value = roll;
  if(totalOnQuery && document.getElementById('order_total')) document.getElementById('order_total').value = totalOnQuery;
});

function checkFinal(e){
  const method = document.getElementById('final_pay_method').value;
  const checked = document.getElementById('final_confirm').checked;
  if(!checked){ alert('Please tick the confirmation checkbox to proceed.'); e.preventDefault(); return false; }
  if(method === 'upi'){
    const fs = document.getElementById('final_pay_screenshot').files;
    if(!fs || fs.length === 0){ alert('You selected online payment. Please upload the payment screenshot before submitting.'); e.preventDefault(); return false; }
  }
  return true;
}
