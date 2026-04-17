const overlay = document.getElementById('login-overlay')
const shell = document.getElementById('shell')

const navBtns = document.querySelectorAll('.nav-btn')
const tabPanes = document.querySelectorAll('.tab-pane')
const breadcrumb = document.getElementById('breadcrumb')

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
    const target = btn.dataset.tab
    navBtns.forEach(b => b.classList.remove('active'))
    tabPanes.forEach(p => p.classList.remove('active'))
    btn.classList.add('active')
    document.getElementById('tab-' + target).classList.add('active')
    breadcrumb.innerHTML = '<span>' + btn.textContent.trim() + '</span>'
})
})

const colorInputs = document.querySelectorAll('.color-input')
const regex = /^#([A-Fa-f0-9]{3,4}){1,2}$/
colorInputs.forEach(input => {
    const color = input.value
    if(regex.test(color)){
        input.style.background = color
    }
    input.addEventListener('input' , () =>  {
                    const color = input.value
    if(regex.test(color)){
        input.style.background = color
    } else {
        input.style.background = "var(--bg)"
    }
    })
})

async function fetchNewUsers() {
    try {
        const response = await fetch('../api/users')
        if (!response.ok) {
            if (response.status === 404)
                window.location.href = '../404.php'
            else
                throw new Error(`HTTP error: ${response.status}`)
            }
        const data = await response.json()
        return data
        } catch (error) {
        console.error('error fetching new users:', error)
    }
}
 
async function init() {
    const raw = await fetchNewUsers()
    if (!raw) {
        document.getElementById('totalLabel').textContent = 'Failed to load'
        return
    }
 
    const sorted = [...raw].sort((a, b) => a.date.localeCompare(b.date))
 
    const labels = sorted.map(d => {
        const [y, m, day] = d.date.split('-')
        return new Date(+y, +m - 1, +day)
          .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
})
 
      const counts = sorted.map(d => parseInt(d.count))
      const total  = counts.reduce((a, b) => a + b, 0)
      document.getElementById('totalLabel').textContent = total + ' total from the last 30 days'
 
    const LINE_COLOR = '#5edd37'
    const FILL_COLOR = '#2bc5051f'
    const GRID_COLOR = 'rgba(85, 85, 85, 0.45)'
    const TICK_COLOR = 'rgb(218, 218, 218)'
 
    new Chart(document.getElementById('usersChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'New users',
          data: counts,
          borderColor: LINE_COLOR,
          borderWidth: 2,
          pointRadius: counts.map(c => c > 1 ? 4 : 2),
          pointBackgroundColor: LINE_COLOR,
          pointBorderColor: '#d3d3d3',
          pointBorderWidth: 2,
          fill: true,
          backgroundColor: FILL_COLOR,
          tension: 0.38
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external({ tooltip, chart }) {
              const tip = document.getElementById('tooltip')
              if (tooltip.opacity === 0) { 
                tip.style.display = 'none' 
                return 
            }
 
              const idx = tooltip.dataPoints[0].dataIndex
              document.getElementById('tip-date').textContent = labels[idx]
              document.getElementById('tip-val').textContent =
                counts[idx] + ' new user' + (counts[idx] !== 1 ? 's' : '')
 
              const rect = chart.canvas.getBoundingClientRect()
              tip.style.display = 'block'
              tip.style.left = (rect.left + tooltip.caretX + 14) + 'px'
              tip.style.top  = (rect.top  + tooltip.caretY - 10 + window.scrollY) + 'px'
            }
          }
        },
        scales: {
          x: {
            grid: { color: GRID_COLOR },
            ticks: {
              color: TICK_COLOR, font: { size: 11 },
              maxRotation: 40, autoSkip: true, maxTicksLimit: 10
            },
            border: { color: GRID_COLOR }
          },
          y: {
            beginAtZero: true,
            grid: { color: GRID_COLOR },
            ticks: {
              color: TICK_COLOR, font: { size: 11 }, stepSize: 1,
              callback: v => Number.isInteger(v) ? v : null
            },
            border: { color: GRID_COLOR }
          }
        }
      }
      })
    }
 
init()

function toggleMode(mode) {
    if (mode === 'light'){
        localStorage.setItem('mode', 'light')
        root.style.setProperty('--bg','#d8dde6')
        root.style.setProperty('--surface','#d1d5db')
        root.style.setProperty('--border','#738183')
        root.style.setProperty('--accent','#4f5a6a')
        root.style.setProperty('--accent-dim','#262c36')
        root.style.setProperty('--text','#13161b')
        root.style.setProperty('--text-muted','#0b0d0f')
    } else if (mode === 'dark'){
        localStorage.setItem('mode', 'dark')
        root.style.setProperty('--bg','#0b0d0f')
        root.style.setProperty('--surface','#13161b')
        root.style.setProperty('--border','#262c36')
        root.style.setProperty('--accent','#d1d5db')
        root.style.setProperty('--accent-dim','#738183')
        root.style.setProperty('--text','#d8dde6')
        root.style.setProperty('--text-muted','#4f5a6a')
    } else {
        console.error("how")
    }
}
const root = document.querySelector(':root')
// style.setProperty
const lightToggle = document.getElementById('light-mode')
lightToggle.addEventListener('change', () => {
    if(lightToggle.checked){
        toggleMode('light')
    } else {
        toggleMode('dark')
    }
})

const showKey =  document.getElementById('api-key')
const keyBtn = document.getElementById('api-btn')
keyBtn.addEventListener('click', () => {
    showKey.type = showKey.type === 'password' ? 'text' : 'password'
})

if (localStorage.getItem('mode')){
    toggleMode(localStorage.getItem('mode'))
    if (localStorage.getItem('mode') === 'light'){
        lightToggle.checked = true
    }
}











