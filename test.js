const { EventLog } = require('./index.js');

const Test = async () => {
    console.log('Testing node-eventlog...');
    
    const logger = new EventLog('TestApplication');
    
    // Test different severity levels
    console.log('Testing info level...');
    const result1 = await logger.log('Info message test', 'info', 1001);
    console.log('Info result:', result1);
    
    console.log('Testing warn level...');
    const result2 = await logger.log('Warning message test', 'warn', 1002);
    console.log('Warn result:', result2);
    
    console.log('Testing error level...');
    const result3 = await logger.log('Error message test', 'error', 1003);
    console.log('Error result:', result3);
    
    // Test default parameters
    console.log('Testing default parameters...');
    const result4 = await logger.log('Default parameters test');
    console.log('Default result:', result4);
    
    console.log('All tests completed successfully!');
};

Test().catch(console.error);
