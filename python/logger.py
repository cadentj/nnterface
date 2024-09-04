import logging

def load_logger():
    # Set up the logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)  # Set the log level to DEBUG to capture all levels of logs

    # Create a file handler that logs to 'server.log'
    file_handler = logging.FileHandler('server.log')
    file_handler.setLevel(logging.DEBUG)  # Set the log level for the file handler

    # Create a formatter and set it for the file handler
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)

    # Add the file handler to the logger
    logger.addHandler(file_handler)

    return logger